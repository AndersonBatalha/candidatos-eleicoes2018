import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Candidato, Governador } from '../../models/candidato';

/*
  Generated class for the DadosAplicativoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DadosAplicativoProvider {

  constructor(
    public sqlite: SQLite, 
  ) {
    console.log('Hello DadosAplicativoProvider Provider');
  }

  public apagarBanco() {
    this.sqlite.deleteDatabase({
      name: 'candidatos.db',
      location: 'default',
    }).then( () => { console.log('BD apagado') })
  }

  public getDB() {
    return this.sqlite.create({
      name: 'candidatos.db',
      location: 'default',
    })
  }

  public criarTabelas(db: SQLiteObject) {
    db.sqlBatch([
      "CREATE TABLE IF NOT EXISTS estado (UF char(5) PRIMARY KEY NOT NULL, nome_estado char(50));",
      "CREATE TABLE IF NOT EXISTS partido(sigla_partido char(8) PRIMARY KEY NOT NULL, nome_partido char(50));",
      "CREATE TABLE IF NOT EXISTS candidato(id_candidato integer PRIMARY KEY NOT NULL, sigla_partido char(8), nome VARCHAR(50), historico_candidato varchar(750), CONSTRAINT fk_partido FOREIGN KEY(sigla_partido) REFERENCES partido(sigla_partido));",
      "CREATE TABLE IF NOT EXISTS presidente(id_presidente integer PRIMARY KEY NOT NULL, id_candidato integer NOT NULL, CONSTRAINT fk_candidato FOREIGN KEY(id_candidato) REFERENCES candidato(id_candidato));",
      "CREATE TABLE IF NOT EXISTS governador(id_governador integer PRIMARY KEY NOT NULL, id_candidato integer NOT NULL, UF char(5) NOT NULL, CONSTRAINT fk_estado FOREIGN KEY(UF) REFERENCES estado(UF), CONSTRAINT fk_candidato FOREIGN KEY(id_candidato) REFERENCES candidato(id_candidato));",
    ]).then(() => {
        console.log('tabelas criadas')
        this.apagarBanco()
      })
      .catch((erro) => {
        console.error(erro.message)
      })
  }

  public iniciarBanco() {
    return this.getDB().then((db: SQLiteObject)=> {
    if (!db.openDBs){
        this.criarTabelas(db);
        this.inserirDados(db);
      }
    })
    .catch((e)=>{ console.error(e.message) })
  }
  
  public inserirDados(db: SQLiteObject) {
    this.inserirDadosEstado(db);
    this.inserirDadosPartidos(db);
    this.inserirDadosCandidatosPresidente(db);
    this.inserirDadosCandidatosGovernador(db);
  }

  public inserirDadosEstado(db: SQLiteObject) {
    let sql_estados: string = "INSERT INTO estado (UF, nome_estado) VALUES ('AC', 'Acre'), ('AL', 'Alagoas'), ('AM', 'Amazonas'), ('AP', 'Amapá'), ('BA', 'Bahia'), ('CE', 'Ceará'), ('DF', 'Distrito Federal'), ('ES', 'Espírito Santo'), ('GO', 'Goiás'), ('MA', 'Maranhão'), ('MG', 'Minas Gerais'), ('MS', 'Mato Grosso do Sul'), ('MT', 'Mato Grosso'), ('PA', 'Pará'), ('PB', 'Paraíba'), ('PE', 'Pernambuco'), ('PI', 'Piauí'), ('PR', 'Paraná'), ('RJ', 'Rio de Janeiro'), ('RN', 'Rio Grande do Norte'), ('RO', 'Rondônia'), ('RR', 'Roraima'), ('RS', 'Rio Grande do Sul'), ('SC', 'Santa Catarina'), ('SE', 'Sergipe'), ('SP', 'São Paulo'), ('TO', 'Tocantins');"
    db.executeSql(sql_estados, {})
      .then(() => {
        console.log('tabelas estados - OK')
      })
      .catch((erro) => {
        console.error(erro.message)
      }) 
  }

  public inserirDadosPartidos(db: SQLiteObject) {
    let sql_partidos: string = "INSERT INTO partido (sigla_partido, nome_partido) VALUES ('MDB', 'Movimento Democrático Brasileiro'), ('PT', 'Partido dos Trabalhadores'), ('PSDB', 'Partido da Social Democracia Brasileira'), ('PP', 'Partido Progressista'), ('PDT', 'Partido Democrático Trabalhista'), ('PTB', 'Partido Trabalhista Brasileiro'), ('DEM', 'Democratas'), ('PR', 'Partido da República'), ('PSB', 'Partido Socialista Brasileiro'), ('PPS', 'Partido Popular Socialista'), ('PSC', 'Partido Social Cristão'), ('PCdoB', 'Partido Comunista do Brasil'), ('PRB', 'Partido Republicano Brasileiro'), ('PV', 'Partido Verde'), ('PSD', 'Partido Social Democrático'), ('PRP', 'Partido Republicano Progressista'), ('PSL', 'Partido Social Liberal'), ('PMN','Partido da Mobilização Nacional'), ('PHS','Partido Humanista da Solidariedade'), ('PTC','Partido Trabalhista Cristão'), ('SD','Solidariedade'), ('PSDC','Partido Social Democrata Cristão'), ('AVANTE','Avante'), ('PODE','Podemos'), ('PSOL','Partido Socialismo e Liberdade'), ('PRTB','Partido Renovador Trabalhista Brasileiro'), ('PROS','Partido Republicano da Ordem Social'), ('PATRI','Patriota'), ('PPL','Partido Pátria Livre'), ('PMB','Partido da Mulher Brasileira'), ('REDE','Rede Sustentabilidade'), ('PSTU','Partido Socialista dos Trabalhadores Unificado'), ('PCB','Partido Comunista Brasileiro'), ('NOVO','Partido Novo'), ('PCO','Partido da Causa Operária');"
    db.executeSql(sql_partidos, {})
      .then(() => {
        console.log('tabelas partidos - OK')
      })
      .catch((erro) => {
        console.error(erro.message)
      }) 
  }

  public inserirDadosCandidatosPresidente(db: SQLiteObject) {
    let sql_candidatos_presidente: Array<string> = [
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 'SD', 'Aldo Rebelo', 'Aldo Rebelo foi deputado federal por seis mandatos consecutivos (1991 a 2015) e presidiu a Câmara entre 2005 e 2007. De 2004 a 2005, foi ministro das Relações Institucionais no governo do ex-presidente Luiz Inácio Lula da Silva. Na gestão Dilma Rousseff, comandou os ministérios do Esporte, da Ciência e Tecnologia e da Defesa. Ex-presidente da União Nacional dos Estudantes (UNE), foi filiado por 40 anos ao PCdoB, partido que deixou em 2017 para se filiar ao PSB. Em 8 de janeiro de 2018, enviou carta ao presidente do PSB, Carlos Siqueira, na qual pôs o nome à disposição do partido para disputar a Presidência, mas deixou a legenda pouco depois por discordar da entrada do ex-presidente do Supremo Tribunal Federal Joaquim Barbosa. Em abril, Aldo Rebelo foi lançado pré-candidato à Presidência da República pelo Solidariedade, partido de Paulinho da Força.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (2, 'PODE', 'Álvaro Dias', 'Álvaro Dias (Podemos-PR) cumpre o quarto mandato de senador (três consecutivos desde 1999 e um de 1983 a 1987). Entre 1987 e 1991, foi governador do Paraná. Começou a carreira política no PMDB. Depois passou por PST e PP, até se filiar ao PSDB, em 1994. Em 2001, foi expulso por agir contra orientações do partido, mas retornou em 2003 e voltou a sair em janeiro de 2016, para entrar no PV. No ano seguinte foi para o Podemos, antigo PTN, partido pelo qual anunciou a pré-candidatura à Presidência da República em novembro, durante evento no Rio de Janeiro.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (3, 'PDT', 'Ciro Gomes', 'Atual vice-presidente do PDT, Ciro Gomes foi ministro da Fazenda entre setembro de 1994 e janeiro de 1995, período do final do governo de Itamar Franco e início do governo Fernando Henrique Cardoso. Foi também ministro da Integração Nacional, entre janeiro de 2003 e março de 2006, no primeiro mandato de Luiz Inácio Lula da Silva. Disputou a Presidência duas vezes (1998 e 2002, derrotado em ambas). Foi governador do Ceará, prefeito de Fortaleza e deputado estadual e federal pelo Ceará. Já se filiou a sete partidos (PDS, PMDB, PSDB, PPS, PSB, PROS e PDT).');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (4, 'PPS', 'Cristovam Buarque', 'Cristovam Buarque é ex-governador do Distrito Federal (1995 a 1999) e ex-ministro da Educação (2003-2004, no primeiro mandato do ex-presidente Luiz Inácio Lula da Silva). Exerce o segundo mandato de senador. É formado em engenharia mecânica, tem mestrado em ciências econômicas e doutorado em economia e desenvolvimento. Também já foi reitor da Universidade de Brasília (UnB), entre 1985 e 1989. Antes de entrar no PPS, foi filiado ao PT e ao PDT.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (5, 'PSDC', 'José Maria Eymael', 'José Maria Eymael disputou quatro vezes a Presidência da República (1998, 2006, 2010 e 2014, derrotado em todas). Deputado federal constituinte, Eymael exerceu dois mandatos na Câmara dos Deputados (entre 1987 e 1995). Em 2012, disputou a Prefeitura de São Paulo, ficando em 11º lugar, com 5,3 mil votos. Eymael está no PSDC desde 1962 (à época PDC). Ficou conhecido pelo jingle Ey, Ey, Eymael, um democrata cristão, lançado em 1985, quando se candidatou a prefeito de São Paulo pela primeira vez. É o atual presidente do PSDC. Sua pré-candidatura à Presidência foi anunciada no dia 15 de março no Acre.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (6, 'PTC', 'Fernando Collor', 'Fernando Collor de Mello está no segundo mandato consecutivo como senador por Alagoas. Ele se elegeu em 2006 e se reelegeu em 2014. Em 1989, foi o primeiro presidente da República eleito pelo voto direto após a ditadura militar. Permaneceu no cargo até 1992, quando sofreu um processo de impeachment. Antes, Collor tinha sido prefeito de Maceió (1979-1982), deputado federal (1982-1986) e governador de Alagoas (1987-1989). O ex-presidente anunciou a pré-candidatura em 19 de janeiro deste ano em discurso em Arapiraca (AL).');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (7, 'PRB', 'Flávio Rocha', 'O empresário Flávio Rocha, executivo das Lojas Riachuelo, se filiou ao PRB para disputar a Presidência da República. Ele é vice-presidente e diretor de Relações com Investidores da empresa Guararapes, que é dona da Riachuelo e encabeça um movimento chamado Brasil 200, que propõe uma agenda liberal na economia e conservadora nos costumes. Rocha exerceu duas vezes o mandato de deputado federal pelo Rio Grande do Norte, eleito em 1986 e em 1990. ');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (8, 'PSDB', 'Geraldo Alckmin', 'O atual governador de SP foi definido como pré-candidato à Presidência pelo PSDB depois de ser o único a se candidatar para disputar as prévias do partido. Médico de formação, Geraldo Alckmin começou a carreira pública em Pindamonhangaba, onde se elegeu vereador em 1973. Depois, foi prefeito da cidade e deputado estadual e federal por São Paulo. Em 1986, se elegeu deputado constituinte federal. Em 1988, deixou o PMDB, partido que integrava até então, para fundar o PSDB. Em 2001, assumiu o governo de São Paulo após a morte do então governador Mário Covas. Se reelegeu em 2002. Em 2006, Alckmin disputou a Presidência e perdeu para o então presidente Lula. Em 2010, elegeu-se novamente para o governo de São Paulo, reeleito em 2014. Em dezembro de 2017, foi eleito presidente nacional do PSDB e anunciou a pré-candidatura para o Palácio do Planalto.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (9, 'PSOL', 'Guilherme Boulos', 'Coordenador do Movimento dos Trabalhadores Sem-Teto (MTST), Guilherme Boulos foi lançado pré-candidato pelo Partido Socialismo e Liberdade (PSol) no dia 10 de março. Completa a chapa como candidata à vice-presidente a ativista indígena Sônia Guajajara. Boulos teve sua filiação ao partido formalizada cinco dias antes do anúncio e foi escolhido em conferência disputada com outros três nomes: Plínio de Arruda Sampaio Jr., Hamilton Assis e Nildo Ouriques. Formado em Filosofia pela Universidade de São Paulo (USP), Boulos tem 35 anos e, antes de se tornar líder do MTST, foi militante estudantil na União da Juventude Comunista.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (10, 'PSL', 'Jair Bolsonaro', 'No sétimo mandato como deputado federal, Jair Bolsonaro é um dos nomes mais fortes entre os pré-candidatos à Presidência. O capitão da reserva do Exército figura em segundo lugar nos cenários com Lula e lidera as intenções de voto sem o petista na maior parte das pesquisas presidenciais até o momento. O escolhido do PSL, no entanto, pode enfrentar problemas na Justiça: o parlamentar foi denunciado ao STF pela PGR por racismo praticado contra quilombolas, indígenas, refugiados, mulheres e LGBTs.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (11, 'NOVO', 'João Amoêdo', 'O empresário carioca de 55 anos fez carreira como executivo de empresas e, em novembro do ano passado, foi anunciado como pré-candidato a presidente do Partido Novo. João Amoêdo é um dos fundadores da sigla, que presidiu entre setembro de 2015 e julho de 2017, quando se afastou por causa da pré-candidatura. Formado em Engenharia Civil e Administração, teve a maior parte da atuação profissional em instituições financeiras. Foi vice-presidente do Unibanco e membro do conselho de administração do Itaú-BBA. Em 2011, passou a integrar o Conselho de Administração da construtora João Fortes. No mesmo ano, participou da fundação no Partido Novo.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (12, 'PPL', 'João Vicente Goulart', 'Filho do ex-presidente João Goulart, deposto pelo golpe militar de 1964, o pré-candidato do Partido Pátria Livre (PPL), João Vicente Goulart, fundou um instituto em homenagem ao pai e disputará a Presidência da República pela primeira vez. Ele é autor do livro Jango e Eu: Memórias de um exílio sem volta. Segundo a revista Época, João Vicente Goulart decidiu deixar o PDT no ano passado devido à insatisfação vom o atual presidente da sigla, o ex - ministro do Trabalho Carlos Lupi. Na nota em que anunciou a pré - candidatura, o PPL afirma que o país vive um momento de miséria, desindustrialização, devastação dos serviços públicos, terrível insegurança pública e o mais lastimável espetáculo de decadência moral.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (13, 'PRTB', 'Levy Fidelix', 'Formado em jornalismo, Levy Fidelix foi candidato a presidente da República em três eleições (1994, 2010 e 2014), mas nunca chegou ao segundo turno. Trabalhou na campanha de Fernando Collor à Presidência em 1989 e, desde então, também disputou eleições para deputado federal por São Paulo, vereador e prefeito, mas jamais se elegeu. Em 2014, prometeu que, se eleito presidente, acabaria com os impostos sobre remédios. Em 26 novembro de 2017, lançou pré-candidatura para disputar a Presidência pela quarta vez.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (14, 'PT', 'Luiz Inácio Lula da Silva', 'O metalúrgico e ex-sindicalista Luiz Inácio Lula da Silva pretende se candidatar à Presidência pela sexta vez. Ocupou o cargo por dois mandatos consecutivos (2003-2006 e 2007-2010) e conseguiu eleger como sucessora a ex-ministra Dilma Rousseff – que se reelegeu em 2014 e governou até 2016, quando sofreu impeachment. Fundador do PT em 1980, foi o primeiro presidente do partido. Em 1986, se elegeu deputado federal constituinte por São Paulo. Em julho do ano passado, Lula foi condenado a 9 anos e 6 meses de prisão pelo juiz Sérgio Moro acusado de corrupção passiva e lavagem de dinheiro em um processo da Lava Jato envolvendo um triplex em Guarujá (SP). Ele recorreu à segunda instância, que manteve a condenação e aumentou a pena para 12 anos de um mês. Lula nega todos os crimes e diz ser inocente. No dia seguinte à condenação no TRF-4, o PT anunciou Lula como pré-candidato à Presidência.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (15, 'PCdoB', 'Manuela D’Ávila', 'A jornalista de 36 anos Manuela D’Ávila iniciou a carreira política no movimento estudantil e foi vice-presidente da União Nacional dos Estudantes (UNE) em 2003. Em 2004, se elegeu vereadora em Porto Alegre. Dois anos depois, em 2006, foi eleita deputada federal, reeleita em 2010. Desde 2015, é deputada estadual no Rio Grande do Sul. A pré-candidatura à Presidência da República foi anunciada em 5 de novembro de 2017 pelo PCdoB. Ela disputou ainda duas vezes a prefeitura de Porto Alegre, em 2012 e 2018, mas não foi eleita. Será a primeira vez que o partido tem candidatura própria desde 1989. Até então, o PCdoB tinha integrado coligações encabeçada pelo PT e apoiado candidatos petistas como Lula e Dilma Rousseff.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (16, 'REDE', 'Marina Silva', 'Marina Silva foi deputada estadual no Acre (1991-1994) e senadora pelo mesmo estado por dois mandatos (1995 a 2010). Ela se licenciou do Senado de 2003 a 2008, quando ocupou o cargo de ministra do Meio Ambiente no governo Luiz Inácio Lula da Silva. Filiada ao PT desde 1986, deixou a legenda em 2009 para se filiar ao PV, partido pelo qual concorreu à Presidência em 2010, mas não conseguiu chegar ao segundo turno. Em 2014, se candidatou novamente, desta vez pelo PSB. À época, era vice na chapa encabeçada por Eduardo Campos, mas assumiu a candidatura após a morte dele em um acidente aéreo. Ficou em terceiro lugar. Anunciou pré-candidatura à Presidência em 2 de dezembro de 2017 durante encontro do partido Rede, do qual é fundadora.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (17, 'DEM', 'Rodrigo Maia', 'Atual presidente da Câmara dos Deputados, Rodrigo Maia (DEM-RJ) está no quinto mandato consecutivo como deputado federal. Assumiu a presidência da Câmara no ano passado, depois que o então presidente, Eduardo Cunha (PMDB-RJ), renunciou ao cargo – e depois foi cassado. Em 2017, Rodrigo Maia presidiu o DEM, partido que ajudou a fundar. É filho de Cesar Maia, ex-prefeito do Rio de Janeiro, e casado com Patricia Vasconcelos, enteada de Moreira Franco, ministro-chefe da Secretaria-Geral da Presidência. A pré-candidatura à Presidência de Rodrigo Maia foi anunciada pelo DEM no dia 8 de março.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (18, 'PMN', 'Valéria Monteiro', 'Jornalista e ex-apresentadora do Jornal Nacional e do Fantástico nos anos 1990, Valéria Monteiro se filiou ao PMN em 12 de janeiro, em ato na Câmara Municipal de São Paulo. Atualmente é dona de uma produtora. Em setembro, quando ainda não estava filiada a partido político, anunciou que pretendia disputar a Presidência da República.');",

      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (1,1);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (2,2);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (3,3);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (4,4);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (5,5);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (6,6);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (7,7);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (8,8);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (9,9);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (10,10);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (11,11);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (12,12);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (13,13);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (14,14);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (15,15);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (16,16);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (17,17);",
      "INSERT INTO presidente(id_presidente, id_candidato) VALUES (18,18);",
    ]
    db.sqlBatch(sql_candidatos_presidente).then(() => {
      console.log('tabelas candidatos presidente - OK')
    })
      .catch((erro) => {
        console.error(erro.message)
      })
  }

  public inserirDadosCandidatosGovernador(db: SQLiteObject) {
    let sql_candidatos_governador: Array<string> = [
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (19, 'PSDB', 'João Dória', 'Após vencer outros nomes que pretendiam se lançar ao Governo nas prévias do PSDB, João Dória renunciou à Prefeitura e é o pré-candidato tucano a governador de São Paulo. Uma das principais barreiras para que o ex-prefeito consiga manter a hegemonia de seu partido – há 24 anos no comando do Estado – é a crescente rejeição do eleitorado. Apesar de liderar a última pesquisa Datafolha com 29% das intenções de voto, Doria registrou 33% de desaprovação no Estado. O quadro é ainda pior na capital paulista: 49% dos eleitores não votariam no ex-prefeito.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (20, 'MDB', 'Paulo Skaf', 'A desaprovação de João Doria só foi inferior à rejeição que Paulo Skaf, pré-candidato do MDB, alcançou no último Datafolha. Segundo a pesquisa eleitoral, 34% do eleitorado paulista não votaria nele de jeito nenhum. Apesar disso, Skaf registrou 20% de intenções de voto e está em segundo lugar na corrida para o Palácio dos Bandeirantes. Presidente da Fiesp desde 2004, Skaf foi candidato a governador de São Paulo nas duas últimas eleições. Em 2010, pelo PSB, ficou em quarto lugar. Em 2014, já pelo PMDB, ficou na segunda posição.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (21, 'PSB', 'Márcio França', 'O atual governador de São Paulo herdou o cargo de seu ex-companheiro de chapa Geraldo Alckmin (PSDB), que deixou o comando do Estado para tentar a Presidência da República. Prefeito de São Vicente (SP) por dois mandatos, Márcio França foi eleito deputado federal em 2006 e permaneceu na Câmara até 2014. Com 8% das intenções de voto no último Datafolha, o candidato do PSB para o governo aposta na articulação política para se tornar mais conhecido entre o eleitorado. Até o momento, França já contaria com o apoio de 13 partidos, o que pode render um bom tempo de televisão durante a campanha para as eleições 2018.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (22, 'PT', 'Luiz Marinho', 'O ex-prefeito de São Bernardo do Campo será o candidato petista para o governo de São Paulo. Luiz Marinho registrou 7% das intenções de voto no último Datafolha, mas apenas 1% dos entrevistados na pesquisa lembrou de seu nome espontaneamente. A tarefa para se tornar mais popular não será fácil. Depois de perder prefeituras em 2016, o PT entra enfraquecido na eleição para o Estado e, caso não consiga apoio de outras siglas, pode ter pouco mais de um minuto de televisão durante a campanha eleitoral.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (23, 'DEM', 'Rodrigo Garcia', 'O deputado federal é pré-candidato ao Governo de São Paulo pelo DEM. Ex-secretário de Habitação do Estado, Rodrigo Garcia deixou o cargo no início de fevereiro e, logo em seguida, foi eleito líder de seu partido na Câmara dos Deputados. Mais do que sua própria candidatura, o eventual apoio de Garcia para João Doria ou Márcio França, e o consequente aumento do tempo de TV na campanha, pode ser decisivo no resultado final das eleições 2018.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (24, 'PSOL', 'Lisete Arelaro', 'A pedagoga Lisete Arelaro foi indicada pelo PSOL para ser candidata ao governo de São Paulo. Ex-diretora da Faculdade de Educação da USP, onde atualmente é professora titular, Lisete é apresentada pelo partido como uma militante feminista e defensora das cotas universitárias. Duas vezes secretária de Educação de Diadema (SP), a pedagoga integrou a equipe de Paulo Freire na Secretaria da cidade de São Paulo durante a gestão de Luiza Erundina no início dos anos 90. No último Datafolha, Lisete ficou com 1% das intenções de voto.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (25, 'NOVO', 'Rogério Chequer', 'O empresário vai estrear na política como candidato a governador de São Paulo. Ex-líder do Vem Pra Rua (VPR), movimento que protagonizou as manifestações pelo impeachment da ex-presidente Dilma Rousseff, Rogério Chequer deixou o grupo e se filiou ao Partido Novo no final do ano passado. A privatização de empresas estatais é uma de suas principais plataformas políticas. Na pesquisa Datafolha mais recente, Chequer registrou 2% da preferência.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (26, 'REDE', 'Alexandre Zeitune', 'Vice-prefeito de Guarulhos, Alexandre Zeitune pode ser o candidato da Rede Sustentabilidade para o Governo de São Paulo. No último Datafolha, ele alcançou 1% das intenções de voto. O partido, no entanto, ainda não definiu a possível candidatura. Zeitune disse ao Estado que, neste momento, a sigla ainda realiza debates internos e com possíveis coligações.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (27, 'PRTB', 'Rodrigo Tavares', 'O advogado Rodrigo Tavares, de 37 anos, é o pré-candidato do PRTB para o Governo de São Paulo. O nome foi escolhido pelo partido em uma “pré-convenção” realizada no dia 28 de abril. De acordo com a sigla, Tavares se licenciará do cargo de diretor na secretaria de Trabalho, Emprego e Renda da cidade de Guarulhos para se dedicar às eleições 2018. Entre suas bandeiras na pré-campanha estão a recuperação do emprego, a segurança pública e a educação.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (28, 'PRB', 'Celso Russomanno', 'Na pesquisa Datafolha divulgada em dezembro de 2017, o virtual candidato Celso Russomanno liderava as intenções de voto para o Governo do Estado com 25%. Apesar do potencial eleitoral, ele não deve ser um dos nomes na disputa. Deputado federal mais votado em 2014, ele deve se candidatar a reeleição a pedido de seu partido, o PRB. A expectativa é que Russomanno, considerado um puxador de votos, consiga eleger uma bancada de 22 deputados.');",

      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (1, 19, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (3, 20, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (4, 21, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (5, 22, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (6, 23, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (7, 24, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (8, 25, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (9, 26, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (10, 27, 'SP')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (11, 28, 'SP')",

      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (29, 'PP', 'Cida Borghetti', 'Ex-deputada estadual e federal, Cida conta com dois trunfos principais na tentativa de se tornar a primeira governadora eleita da história do Paraná. Um deles é o marido, o deputado federal Ricardo Barros (PP). Como ministro da Saúde do governo Michel Temer (PMDB) por quase dois anos, ele realizou um périplo por todo o estado, com a esposa a tiracolo, anunciando verbas e obras para diversos municípios. Além disso, com a renúncia de Richa para disputar o Senado, Cida é a governadora desde 6 de abril. Dessa forma, por seis meses até a eleição, estarão nas mãos dela a estrutura do governo e a visibilidade do cargo. E comandar o Executivo estadual já tem trazido resultados positivos: por ora, ela tem o maior leque de alianças, com mais de uma dezena de partidos, o que lhe garante praticamente metade do tempo da propaganda eleitoral.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (30, 'PSD', 'Ratinho Jr.', 'Deputado estadual mais votado em 2014, com 300 mil votos, Ratinho não tinha exercido um dia sequer do mandato até 12 de setembro do ano passado, quando finalmente tomou posse na Assembleia Legislativa. Desde 1º janeiro de 2015, ele era secretário do Desenvolvimento Urbano de Richa. Nesse período, estreitou laços com centenas de prefeitos, por meio da liberação de recursos, o que certamente será usado como arma na eleição deste ano. Outra aposta é que, ao contrário do perfil mais conservador dos curitibanos – o que contribuiu para derrotá-lo na disputa pela prefeitura da capital em 2012 −, o eleitorado do estado absorverá melhor a imagem de Ratinho, turbinada, sobretudo, pelo apoio do pai e apresentador de TV. Durante a campanha, porém, o parlamentar terá de lidar com o seu principal calcanhar de aquiles: a ligação com o ex-governador, cuja imagem ainda segue desgastada por ajustes fiscais e escândalos de corrupção.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (31, 'PDT', 'Osmar Dias', 'Desde que foi derrotado por Richa em 2010 na eleição ao governo do estado, Osmar permaneceu afastado da vida político-partidária. Nesse meio tempo, foi vice-presidente de agronegócios do Banco do Brasil, durante a gestão Dilma Rousseff (PT). E essa ligação com o petismo certamente será um questionamento ao qual o ex-senador terá de responder durante a campanha, apesar de o cargo ocupado por ele ter atribuições técnicas. Também poderá pesar contra Osmar a candidatura presidencial de Ciro Gomes (PDT), que foi ministro de Estado na primeira gestão de Lula (PT). O ex-parlamentar, porém, garante ter a liberação do partido para apoiar o irmão, senador Alvaro Dias (Podemos), outro nome que pretende disputar a Presidência da República. Se a recíproca ocorrer, o pedetista tende a se beneficiar, já que as pesquisas apontam Alvaro como o candidato a presidente preferido no Paraná. Na campanha, Osmar, que certamente vai ressaltar sua experiência na vida pública em comparação com os adversários, deverá ser o único a adotar um discurso de oposição a Richa.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (32, 'MDB', 'Roberto Requião', 'Governador do estado por três vezes, Requião já manifestou publicamente a intenção de disputar o cargo mais uma vez. Caso seja candidato, deve capitalizar a imagem de anti-Richa e ter como trunfo o apoio de boa parte do funcionalismo público estadual, que sofreu com medidas tomadas na gestão do tucano e soma um contingente de centenas de milhares de eleitores. Por outro lado, o peemedebista, que está no Senado desde 2011, ficou um pouco afastado do dia a dia da política no estado, o que pode deixá-lo carente do apoio de prefeitos e vereadores e, portanto, enfraquecido de cabos eleitorais no interior. Além disso, com o PMDB local completamente rachado, Requião poderia enfrentar certo boicote dentro do próprio partido. Por isso, a maior aposta é que ele decida concorrer à reeleição para o Senado.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (33, 'REDE', 'Jorge Bernardi', 'Bernardi foi vereador de Curitiba por sete mandatos e, na última legislatura, destacou-se como presidente da CPI do transporte coletivo. Entre 1989 e 1990, presidiu o Legislativo da capital. Para o pleito de outubro, foi lançado como pré-candidato ao governo do Paraná com o principal objetivo de garantir um palanque no estado à ex-ministra e ex-senadora Marina Silva, que deverá disputar a Presidência da República pela terceira vez consecutiva. Apesar de tudo indicar que a maior parte dos votos presidenciais paranaenses tende a ir para o senador Alvaro Dias (Podemos), com Marina bem colocada nas pesquisas e um nome forte para ir ao segundo turno, qualquer voto a mais no Paraná poderá ser decisivo.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (34, 'PRTB', 'Geonísio Marinho', 'Presidente do PRTB no Paraná, foi candidato a governador em 2014. Na ocasião, recebeu apenas 7.303 votos, o equivalente a 0,12% do total dos válidos. O único cargo público que ocupou foi o de diretor de serviços especiais da prefeitura de Curitiba entre 2001 e 2002, na segunda gestão de Cassio Taniguchi.');",

      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (12, 29, 'PR')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (13, 30, 'PR')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (14, 31, 'PR')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (15, 32, 'PR')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (16, 33, 'PR')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (17, 34, 'PR')",

      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (35, 'PSD', 'Índio da Costa', 'O deputado federal é o único nome cogitado pelo PSD, até o momento, para ser candidato a governador do Rio de Janeiro. Ex-secretário municipal de Urbanismo, Infraestrutura e Habitação da administração de Marcelo Crivella, Índio da Costa espera contar com o apoio do prefeito do Rio e de seu partido, o PRB, nas eleições estaduais. Crítico da intervenção militar na Segurança Pública do Rio – apesar de ter votado a favor da medida na Câmara dos Deputados -, o parlamentar já foi candidato a vice-presidente da República na chapa encabeçada por José Serra (PSDB) em 2010. Naquela oportunidade, Índio da Costa estava filiado ao DEM.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (36, 'PODE', 'Romário', 'O senador é o pré-candidato a governador do Rio do Podemos (ex-PTN). A pretensão do ex-jogador de disputar o pleito foi anunciada em setembro do ano passado e confirmada em março deste ano. Em 2014, Romário foi eleito ao Senado Federal com 4.683.963 votos, um número pouco menor dos votos somados (4.861.678) que Luiz Fernando Pezão e Marcelo Crivella receberam no primeiro turno da eleição para governador daquele ano. A eventual concretização da candidatura de Romário também deve abrir palanque no Rio para o senador Álvaro Dias, pré-candidato de seu partido para a Presidência da República.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (38, 'PSOL', 'Tarcisio Motta', 'O vereador do Rio de Janeiro deverá ser novamente o candidato do PSOL para o Governo do Estado. Em 2014, Tarcísio Motta surpreendeu durante a campanha e alcançou a quinta posição na eleição para o Palácio da Guanabara, com quase 9% dos votos no primeiro turno. Neste ano, um dos nomes cotados para compor a chapa de Motta como candidata ao cargo de vice-governadora era o da vereadora Marielle Franco, assassinada em uma emboscada no centro do Rio no mês de março.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (39, 'PT', 'Celso Amorim', 'O ex-chanceler Celso Amorim é o provável candidato petista para o Governo do Rio. A pré-candidatura do ministro das Relações Exteriores nos governos de Luiz Inácio Lula da Silva e Dilma Rousseff foi confirmada ao Estado pelo presidente do PT no Rio, Washington Quaquá. De acordo com ele, o partido ainda não fechou nenhum acordo, mas negocia o eventual apoio do PCdoB para as eleições 2018 no Estado.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (40, 'PCdoB', 'Leonardo Giordano', 'O PCdoB, no entanto, também já definiu seu pré-candidato para as eleições 2018. O vereador de Niterói Leonardo Giordano é a aposta da sigla para as eleições estaduais. De acordo com Giordano, o objetivo do PCdoB é construir uma “frente ampla” na disputa ao Governo. A ideia deverá ser discutida com líderes do PDT, PSB, PSOL, PCO e também com o PT. Apesar de se considerar uma alternativa viável para o pleito, Giordano admite que pode abrir mão da candidatura própria para apoiar outro nome, de outro partido, que encabece esta frente.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (41, 'REDE', 'Miro Teixeira', 'Quem também está conversando com líderes de outros partidos é o deputado Miro Teixeira, provável candidato da Rede Sustentabilidade para o Governo do Rio. O parlamentar revelou ao Estado que mantém diálogo aberto com outros pré-candidatos e que já procurou conversar com membros das direções do PSDB, PPS, PSD e DEM. Atualmente no sétimo partido de sua carreira política, Miro já confirmou que não será candidato para a Câmara dos Deputados nesta eleição.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (42, 'PSC', 'Wilson José Witzel', 'O ex-juiz federal deixou a magistratura após 17 anos no início de março e deve ser o candidato a governador do Rio pelo PSC. Nascido em Jundiaí, Wilson José Witsel  se mudou para o Rio aos 19 anos, onde foi integrante do Corpo de Fuzileiros Navais, servidor municipal na PreviRio e defensor público estadual antes de se tornar juiz, em 2001. Como magistrado, atuou em varas cíveis e criminais no Rio e no Espírito Santo. Sua candidatura também deverá servir como palanque no Rio para Paulo Rabello de Castro, ex-presidente do BNDES e pré-candidato à Presidência da República pelo PSC.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (43, 'PRP', 'Anthony Garotinho', 'Recém-filiado ao PRP, o ex-governador é o nome do pequeno partido para as eleições 2018 no Estado do Rio. De acordo com a sigla, a provável candidatura de Anthony Garotinho já conta com apoio de Pros, Patriota e PPL. O ex-ministro do Trabalho Brizola Neto (PPL) é cotado para compor a chapa como vice. Preso em novembro de 2017 sob acusações de crimes como corrupção, participação em organização criminosa e falsidade na prestação de contas eleitorais entre os anos de 2009 e 2016, Anthony Garotinho teve a prisão preventiva suspensa ainda em dezembro do ano passado, por decisão do então presidente do Tribunal Superior Eleitoral (TSE), ministro Gilmar Mendes.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (44, 'DEM', 'Eduardo Paes', 'O ex-prefeito do Rio de Janeiro deixou o MDB e se filiou ao DEM no início de abril. Antes disso, Eduardo Paes chegou a negociar sua ida para o PP. Após reuniões com os líderes das duas siglas, o presidente da Câmara dos Deputados Rodrigo Maia chegou a afirmar que se Paes se candidatasse ao Palácio da Guanabara pelo PP o DEM o apoiaria e vice-versa. No entanto, o ex-prefeito ainda não definiu se será, de fato, candidato a governador do Rio de Janeiro. Se decidir concorrer, ainda terá de enfrentar outro problema: Paes está atualmente inelegível por abuso de poder econômico após decisão do Tribunal Regional Eleitoral do Rio.  Ele nega as acusações e ainda pode recorrer ao Tribunal Superior Eleitoral.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (45, 'MDB', 'Vinícius Farah', 'Partido do atual governador Luiz Fernando Pezão e de seu antecessor, Sérgio Cabral, o MDB pretende ter candidato próprio nas eleições 2018. De acordo com o deputado federal Leonardo Picciani, presidente estadual da legenda, o nome cotado para disputar o Palácio da Guanabara pela sigla é o de Vinícius Farah, ex-prefeito do município de Três Rios.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (46, 'PDT', 'Martha Rocha', 'A deputada estadual Martha Rocha é o nome preferido pela direção do PDT para a candidatura ao Governo. A parlamentar, contudo, não tem interesse em disputar o pleito para o Palácio da Guanabara e reluta em aceitar a indicação. Neste cenário, o partido presidido pelo ex-ministro do Trabalho Carlos Lupi também cogita a candidatura do deputado estadual Pedro Fernandes. Recém-filiado à sigla, Fernandes já foi secretário estadual de Ciência e Tecnologia na gestão Pezão e secretário municipal de Assistência Social na gestão Crivella e colocou seu nome à disposição do partido para o pleito estadual. A definição do impasse deve acontecer em meados de maio.');",

      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (18, 35, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (19, 36, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (21, 38, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (22, 39, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (23, 40, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (24, 41, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (25, 42, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (26, 43, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (27, 44, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (28, 45, 'RJ')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (29, 46, 'RJ')",

      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (47, 'PSDB', 'Antonio Anastasia', 'Antonio Anastasia é senador por Minas Gerais, tendo sido eleito em 2014 com mais de 5 milhões de votos. Foi governador do Estado no período 2010/2014. Formulador do conhecido Choque de Gestão, é hoje um dos mais reconhecidos gestores públicos do País. Anastasia é um dos principais defensores de um novo Pacto Federativo, que dê mais autonomia e recursos para que Estados e Municípios possam enfrentar seus desafios, com a oferta de serviços públicos de melhor qualidade. Servidor de carreira da Fundação João Pinheiro, é bacharel e mestre em Direito pela Universidade Federal de Minas Gerais, instituição da qual também é professor licenciado.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (48, 'PT', 'Fernando Pimentel', 'Fernando Pimentel é economista, graduado pela PUC de Minas Gerais e Mestre em Ciência Política pela UFMG, foi vice e, posteriormente, eleito Prefeito de Belo Horizonte (2005/2008) pelo Partido dos Trabalhadores (PT), partido que ajudou a fundar. É o atual governador de Minas Gerais e foi ministro do Desenvolvimento, Indústria e Comércio Exterior.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (49, 'PT', 'Fernando Pimentel', 'Fernando Pimentel é economista, graduado pela PUC de Minas Gerais e Mestre em Ciência Política pela UFMG, foi vice e, posteriormente, eleito Prefeito de Belo Horizonte (2005/2008) pelo Partido dos Trabalhadores (PT), partido que ajudou a fundar. É o atual governador de Minas Gerais e foi ministro do Desenvolvimento, Indústria e Comércio Exterior.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (50, 'PSB', 'Márcio Lacerda', 'Formado em administração de empresas pela Faculdade de Ciências Econômicas da Universidade Federal de Minas Gerais (UFMG), Marcio Araújo de Lacerda é empresário, foi prefeito de Belo Horizonte por duas vezes e disputará a eleição para governador.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (51, 'DEM', 'Rodrigo Pacheco', 'Rodrigo Otávio Soares Pacheco é advogado. Filiado ao Democratas, é deputado federal por Minas Gerais e o atual presidente da Comissão de Constituição e Justiça e de Cidadania da Câmara dos Deputados. Foi eleito deputado federal em 2014.');",

      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (30, 47, 'MG')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (31, 48, 'MG')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (32, 49, 'MG')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (33, 50, 'MG')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (34, 51, 'MG')",

      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (52, 'PRTB', 'Rogério Tadeu da Luz', 'Rogério Tadeu da Luz Da Luz (Jundiaí, 12 de fevereiro de 1968) está há 17 anos em Salvador, cidade onde é cidadão honorário desde 2006. Ele ganhou notoriedade por suas performances nada convencionais na propaganda eleitoral da televisão. Em 2002, candidato a governador, aparecia de costas para as câmeras. A explicação era que os políticos viviam de costas para o povo, e que cabia aos eleitores virarem as costas aos candidatos tradicionais. Em 2006, quando disputou a Câmara dos Deputados, ficava de cabeça para baixo, afirmando que as coisas no país estavam de ponta-cabeça.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (53, 'PSB', 'Lídice da Mata', 'Lídice da Mata e Sousa é uma política e economista brasileira, exercendo atualmente o cargo de senadora pelo estado da Bahia. Filiada ao Partido Socialista Brasileiro, é presidente do diretório estadual de seu partido no estado da Bahia');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (54, 'PSOL', 'Marcos Mendes', 'Marcos Mendes é candidato ao cargo de Governador da Bahia pelo PSOL. Ele nasceu em 1965 na capital baiana e é formado em Geologia pela UFBA (Universidade Federal da Bahia), com especialização em Meio Ambiente, pós-graduado em Gestão Pública Municipal e Governamental e mestre em Geologia Ambiental. Concorreu ao primeiro cargo eletivo em 2006, como deputado federal. Foi candidato a vereador por duas vezes, em 2008 e em 2012. Nas eleições de 2010 e 2014 disputou o cargo de Governador, mas não obteve êxito.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (55, 'DEM', 'Paulo Souto', 'Natural de Caetité (BA), Paulo Ganem Souto nasceu em 19 de novembro de 1943. Formou-se em Geologia pela Universidade Federal da Bahia (UFBA), instituição onde foi professor até ocupar a Superintendência da Sudene em 1987. Ocupou cargos administrativos no primeiro governo de Antonio Carlos Magalhães (1971-1975), indicado pelo regime militar. Em 1991 foi eleito vice-governador pelo antigo PFL (atual DEM) na chapa do aliado ACM, a quem sucedeu no executivo estadual, entre 1995 e 1998. Elegeu-se senador e, quatro anos mais tarde, voltou ao Palácio de Ondina. Perdeu a reeleição para o candidato do PT Jacques Wagner, que o derrotou novamente em 2010.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (56, 'PSTU', 'Renata Mallet', 'Renata Mallet é candidata ao cargo de Governadora da Bahia pelo PSTU. Natural da capital Salvador, na Bahia, nasceu em 1981 e é bancária. Tentou se eleger vereadora em 2014, mas os 1.225 votos não foram suficientes.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (57, 'PT', 'Rui Costa', 'Rui Costa é candidato ao cargo de Governador da Bahia pelo PT (Partido dos Trabalhadores). Ele nasceu em 1963, em Salvador, e é formado em Economia pela UFBA (Universidade Federal da Bahia).');",

      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (35, 52, 'BA')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (36, 53, 'BA')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (37, 54, 'BA')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (38, 55, 'BA')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (39, 56, 'BA')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (40, 57, 'BA')",

      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (58, 'PSB', 'Rodrigo Rollemberg', 'Atual governador do DF, Rodrigo Rollemberg será candidato à reeleição. Apesar de estar no controle da máquina, o pré-candidato do PSB terá dois grandes desafios para continuar no Palácio do Buriti: superar os altos índices de rejeição de seu Governo e conquistar apoios de outras siglas durante a campanha.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (59, 'PR', 'Jofran Frejat', 'O ex-deputado federal Jofran Frejat deverá ser novamente candidato a governador do Distrito Federal. Ele foi o segundo colocado na disputa de 2014, quando era candidato a vice e assumiu a chapa então liderada por José Roberto Arruda, que teve sua candidatura cassada pela Justiça Eleitoral. Frejat conta com o apoio do deputado federal e presidente estadual do DEM Alberto Fraga, que chegou a ser cogitado como candidato, mas deverá tentar o Senado nas eleições 2018. O pré-candidato do PR também já está com acordos bem encaminhados com PP, Avante e MDB.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (60, 'PRP', 'Paulo Chagas', 'Pelo menos 71 militares do Exército pretendem ser candidatos nas eleições 2018. Um deles é o general da reserva do Exército Paulo Chagas, pré-candidato pelo PRP para o governo do Distrito Federal. “Eu não pretendo ser político. Eu pretendo fazer uma incursão na política para dar a minha contribuição”, afirmou Chagas para o Estado. Apoiador da candidatura de Jair Bolsonaro para a Presidência , o general defende a ideia de que os militares contam com uma formação moral que os credenciam como “cidadãos diferenciados” para o momento que o País atravessa.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (61, 'PDT', 'Joe Valle', 'Atual presidente da Câmara Legislativa do Distrito Federal, Joe Valle é o nome desejado pela direção do PDT para disputar o cargo de governador do DF. O deputado distrital, no entanto, resiste à ideia. Seu desejo é ser candidato ao Senado nas eleições 2018. A desistência de Joaquim Barbosa de disputar as eleições presidenciais também pode influenciar a candidatura. Para conseguir apoio do PSB para Ciro Gomes, o PDT pode abrir mão de entrar com um nome próprio na corrida pelo Buriti.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (62, 'REDE', 'Chico Leite', 'Procurador de Justiça, Chico Leite está atualmente no quarto mandato como deputado distrital na Câmara Legislativa do Distrito Federal e é a aposta da Rede para a disputa ao Governo do DF.  No ano de 2010, quando era filiado ao PT, Leite foi o autor do relatório de abertura do processo de impeachment do então governador do DF, José Roberto Arruda.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (63, 'PROS', 'Eliana Pedrosa', 'A ex-deputada distrital deixou o Podemos, se filou ao Pros e é a pré-candidata do partido para governadora do Distrito Federal. Eliana Pedrosa conta com o apoio da família de Joaquim Roriz, governador do DF por quatro mandatos e uma das forças políticas mais influentes na região, para tentar ser a primeira mulher a ocupar o Palácio do Buriti.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (64, 'PSOL', 'Fátima Sousa', 'A professora e ex-diretora da Faculdade de Ciências da Saúde da Universidade de Brasília é a escolha do PSOL para a eleição ao Governo do Distrito Federal. Fátima Sousa será candidata pela primeira vez em 2018, mas já atuou na política. No início dos anos 90, trabalhou na área da Saúde da administração de Luiza Erundina, então prefeita da cidade de São Paulo pelo PT. Enfermeira sanitarista, Fátima também foi coordenadora nacional do Programa de Agentes Comunitários de Saúde.');",
      "INSERT INTO candidato(id_candidato, sigla_partido, nome, historico_candidato) VALUES (65, 'NOVO', 'Alexandre Guerra', 'Com 37 anos, o empresário Alexandre Guerra fará sua estreia na disputa por um cargo majoritário nas eleições 2018. Ele é a aposta do Partido Novo para a disputa pelo Governo do DF. Ex-presidente do Giraffas, Alexandre é filho de Carlos Guerra, um dos fundadores da rede de restaurantes. Entre suas principais propostas está o fim das indicações políticas para as secretarias estaduais.');",

      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (41, 58, 'DF')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (42, 59, 'DF')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (43, 60, 'DF')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (44, 61, 'DF')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (45, 62, 'DF')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (46, 63, 'DF')",
      "INSERT INTO governador(id_governador, id_candidato, UF) VALUES (47, 64, 'DF')",
    ]
    db.sqlBatch(sql_candidatos_governador).then(() => {
      console.log('tabelas candidatos governador - OK')
    })
      .catch((erro) => {
        console.error(erro.message)
    })
  }
  
  public CandidatosPresidente() {
    let sql: string = "SELECT candidato.id_candidato, candidato.nome, partido.sigla_partido FROM candidato, presidente, partido WHERE candidato.sigla_partido = partido.sigla_partido AND candidato.id_candidato = presidente.id_candidato"
    return this.getDB().then((db: SQLiteObject) => {
      return db.executeSql(sql, [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let candidatos: Array<any> = []
            for (let i=0; i < data.rows.length; i++) {
              let candidato = data.rows.item(i);
              candidatos.push(candidato);
            }
            return candidatos
          }
          else {
            return []
          }
        })
        .catch((erro) => {
          console.error(erro.message)
        }) 
    })
    .catch((erro) => {
      console.error(erro.message)
    })
  }

  public CandidatosGovernador(estado: string) {
    let sql: string = "SELECT candidato.id_candidato, candidato.nome, partido.sigla_partido, estado.nome_estado FROM candidato, governador, estado, partido WHERE candidato.sigla_partido = partido.sigla_partido AND candidato.id_candidato = governador.id_candidato AND estado.UF = governador.UF AND estado.nome_estado=?"
    return this.getDB().then((db: SQLiteObject) => {
      return db.executeSql(sql, [estado])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let candidatos: Array<any> = []
            for (let i = 0; i < data.rows.length; i++) {
              let candidato = data.rows.item(i);
              candidatos.push(candidato);
            }
            return candidatos
          }
          else {
            return []
          }
        })
        .catch((erro) => {
          console.error(erro.message)
        })
    })
      .catch((erro) => {
        console.error(erro.message)
      })

  }

  public DetalhesCandidatoPresidente(id: number) {
    let sql: string = "SELECT candidato.id_candidato, candidato.nome, candidato.historico_candidato, partido.sigla_partido, partido.nome_partido FROM candidato, presidente, partido WHERE candidato.id_candidato = presidente.id_candidato AND candidato.sigla_partido = partido.sigla_partido AND presidente.id_candidato=?"
    return this.getDB().then((db: SQLiteObject) => {
      return db.executeSql(sql, [id])
        .then((data: any) => {
          let row = data.rows.item(0);
          if (row != undefined) {
            let candidato = new Candidato()
            candidato.id = row.id_candidato
            candidato.nome = row.nome
            candidato.historico = row.historico_candidato
            candidato.siglaPartido = row.sigla_partido
            candidato.nomePartido = row.nome_partido
            return candidato
          }
          return null
        })
        .catch((erro) => {
          console.error(erro.message)
        })
    })
      .catch((erro) => {
        console.error(erro.message)
      })

  }

  public DetalhesCandidatoGovernador(id: number, estado: string) {
    return this.getDB().then((db: SQLiteObject) => {
      let sql: string = "SELECT candidato.id_candidato, candidato.nome, candidato.historico_candidato, partido.sigla_partido, partido.nome_partido, estado.UF, estado.nome_estado FROM candidato, governador, estado, partido WHERE candidato.sigla_partido = partido.sigla_partido AND estado.UF = governador.UF AND candidato.id_candidato=? AND estado.nome_estado=?"
      return db.executeSql(sql, [id, estado])
        .then((data: any) => {
          let row = data.rows.item(0);
          if (row != undefined) {
            let candidato = new Governador()
            candidato.id = id
            candidato.nome = row.nome
            candidato.historico = row.historico_candidato
            candidato.siglaPartido = row.sigla_partido
            candidato.nomePartido = row.nome_partido
            candidato.estado = estado
            candidato.uf = row.UF
            return candidato
          }
          return null
        })
        .catch((erro) => {
          console.error(erro.message)
        })
    })
      .catch((erro) => {
        console.error(erro.message)
      })

  }

}

