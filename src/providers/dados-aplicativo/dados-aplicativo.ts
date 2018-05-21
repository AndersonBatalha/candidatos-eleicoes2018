import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

/*
  Generated class for the DadosAplicativoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DadosAplicativoProvider {

  constructor(
    public http: HttpClient, 
    public sqlite: SQLite, 
  ) {
    console.log('Hello DadosAplicativoProvider Provider');
  }

  public apagarBanco() {
    this.sqlite.deleteDatabase({
      name: 'data.db',
      location: 'default',
    }).then( () => { console.log('apagado') })
  }

  public criarBanco() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default',
    })
    .then((db: SQLiteObject) => {

      this.criarTabelas(db)
      this.inserirDadosCandidatos(db)
      this.getCandidatosPresidente(db)

    })
    .catch((erro) => {
      console.error(erro.message)
    })
  }

  private criarTabelas(db: SQLiteObject) {
    db.sqlBatch([
      "CREATE TABLE IF NOT EXISTS estado(UF char(5) PRIMARY KEY NOT NULL, nome_estado char(50))",
      "CREATE TABLE IF NOT EXISTS partido(sigla_partido char(8) PRIMARY KEY NOT NULL, nome_partido char(50))",
      "CREATE TABLE IF NOT EXISTS cargo(id_cargo integer PRIMARY KEY NOT NULL, desc_cargo char(20))",
      "CREATE TABLE IF NOT EXISTS candidato(id_cargo integer NOT NULL, id_candidato integer PRIMARY KEY NOT NULL, sigla_partido char(8), nome VARCHAR(50), historico_candidato varchar(750), CONSTRAINT fk_partido FOREIGN KEY(sigla_partido) REFERENCES partido(sigla_partido), CONSTRAINT fk_cargo FOREIGN KEY(id_cargo) REFERENCES cargo(id_cargo))",
    ])
      .then(() => {
        console.log('tabelas criadas')
      })
      .catch((erro) => {
        console.error(erro.message)
      }) 
  }
  
  private inserirDadosCandidatos(db: SQLiteObject) {
    db.sqlBatch([
      "INSERT INTO cargo (id_cargo, desc_cargo) VALUES (1, 'Presidente'), (2, 'Governador');",
      "INSERT INTO estado (UF, nome_estado) VALUES ('AC', 'Acre'), ('AL', 'Alagoas'), ('AM', 'Amazonas'), ('AP', 'Amapá'), ('BA', 'Bahia'), ('CE', 'Ceará'), ('DF', 'Distrito Federal'), ('ES', 'Espírito Santo'), ('GO', 'Goiás'), ('MA', 'Maranhão'), ('MG', 'Minas Gerais'), ('MS', 'Mato Grosso do Sul'), ('MT', 'Mato Grosso'), ('PA', 'Pará'), ('PB', 'Paraíba'), ('PE', 'Pernambuco'), ('PI', 'Piauí'), ('PR', 'Paraná'), ('RJ', 'Rio de Janeiro'), ('RN', 'Rio Grande do Norte'), ('RO', 'Rondônia'), ('RR', 'Roraima'), ('RS', 'Rio Grande do Sul'), ('SC', 'Santa Catarina'), ('SE', 'Sergipe'), ('SP', 'São Paulo'), ('TO', 'Tocantins');",
      "INSERT INTO partido (sigla_partido, nome_partido) VALUES ('MDB', 'Movimento Democrático Brasileiro'), ('PT', 'Partido dos Trabalhadores'), ('PSDB', 'Partido da Social Democracia Brasileira'), ('PP', 'Partido Progressista'), ('PDT', 'Partido Democrático Trabalhista'), ('PTB', 'Partido Trabalhista Brasileiro'), ('DEM', 'Democratas'), ('PR', 'Partido da República'), ('PSB', 'Partido Socialista Brasileiro'), ('PPS', 'Partido Popular Socialista'), ('PSC', 'Partido Social Cristão'), ('PCdoB', 'Partido Comunista do Brasil'), ('PRB', 'Partido Republicano Brasileiro'), ('PV', 'Partido Verde'), ('PSD', 'Partido Social Democrático'), ('PRP', 'Partido Republicano Progressista'), ('PSL', 'Partido Social Liberal'), ('PMN','Partido da Mobilização Nacional'), ('PHS','Partido Humanista da Solidariedade'), ('PTC','Partido Trabalhista Cristão'), ('SD','Solidariedade'), ('PSDC','Partido Social Democrata Cristão'), ('AVANTE','Avante'), ('PODE','Podemos'), ('PSOL','Partido Socialismo e Liberdade'), ('PRTB','Partido Renovador Trabalhista Brasileiro'), ('PROS','Partido Republicano da Ordem Social'), ('PATRI','Patriota'), ('PPL','Partido Pátria Livre'), ('PMB','Partido da Mulher Brasileira'), ('REDE','Rede Sustentabilidade'), ('PSTU','Partido Socialista dos Trabalhadores Unificado'), ('PCB','Partido Comunista Brasileiro'), ('NOVO','Partido Novo'), ('PCO','Partido da Causa Operária');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 1, 'PODE', 'Aldo Rebelo', 'Aldo Rebelo foi deputado federal por seis mandatos consecutivos (1991 a 2015) e presidiu a Câmara entre 2005 e 2007. De 2004 a 2005, foi ministro das Relações Institucionais no governo do ex-presidente Luiz Inácio Lula da Silva. Na gestão Dilma Rousseff, comandou os ministérios do Esporte, da Ciência e Tecnologia e da Defesa. Ex-presidente da União Nacional dos Estudantes (UNE), foi filiado por 40 anos ao PCdoB, partido que deixou em 2017 para se filiar ao PSB. Em 8 de janeiro de 2018, enviou carta ao presidente do PSB, Carlos Siqueira, na qual pôs o nome à disposição do partido para disputar a Presidência, mas deixou a legenda pouco depois por discordar da entrada do ex-presidente do Supremo Tribunal Federal Joaquim Barbosa. Em abril, Aldo Rebelo foi lançado pré-candidato à Presidência da República pelo Solidariedade, partido de Paulinho da Força.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 2, 'SD', 'Alvaro Dias', 'Alvaro Dias (Podemos-PR) cumpre o quarto mandato de senador (três consecutivos desde 1999 e um de 1983 a 1987). Entre 1987 e 1991, foi governador do Paraná. Começou a carreira política no PMDB. Depois passou por PST e PP, até se filiar ao PSDB, em 1994. Em 2001, foi expulso por agir contra orientações do partido, mas retornou em 2003 e voltou a sair em janeiro de 2016, para entrar no PV. No ano seguinte foi para o Podemos, antigo PTN, partido pelo qual anunciou a pré-candidatura à Presidência da República em novembro, durante evento no Rio de Janeiro.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 3, 'PDT', 'Ciro Gomes', 'Atual vice-presidente do PDT, Ciro Gomes foi ministro da Fazenda entre setembro de 1994 e janeiro de 1995, período do final do governo de Itamar Franco e início do governo Fernando Henrique Cardoso. Foi também ministro da Integração Nacional, entre janeiro de 2003 e março de 2006, no primeiro mandato de Luiz Inácio Lula da Silva. Disputou a Presidência duas vezes (1998 e 2002, derrotado em ambas). Foi governador do Ceará, prefeito de Fortaleza e deputado estadual e federal pelo Ceará. Já se filiou a sete partidos (PDS, PMDB, PSDB, PPS, PSB, PROS e PDT).');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 4, 'PPS', 'Cristovam Buarque', 'Cristovam Buarque é ex-governador do Distrito Federal (1995 a 1999) e ex-ministro da Educação (2003-2004, no primeiro mandato do ex-presidente Luiz Inácio Lula da Silva). Exerce o segundo mandato de senador. É formado em engenharia mecânica, tem mestrado em ciências econômicas e doutorado em economia e desenvolvimento. Também já foi reitor da Universidade de Brasília (UnB), entre 1985 e 1989. Antes de entrar no PPS, foi filiado ao PT e ao PDT.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 5, 'PSDC', 'José Maria Eymael', 'José Maria Eymael disputou quatro vezes a Presidência da República (1998, 2006, 2010 e 2014, derrotado em todas). Deputado federal constituinte, Eymael exerceu dois mandatos na Câmara dos Deputados (entre 1987 e 1995). Em 2012, disputou a Prefeitura de São Paulo, ficando em 11º lugar, com 5,3 mil votos. Eymael está no PSDC desde 1962 (à época PDC). Ficou conhecido pelo jingle Ey, Ey, Eymael, um democrata cristão, lançado em 1985, quando se candidatou a prefeito de São Paulo pela primeira vez. É o atual presidente do PSDC. Sua pré-candidatura à Presidência foi anunciada no dia 15 de março no Acre.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 6, 'PTC', 'Fernando Collor', 'Fernando Collor de Mello está no segundo mandato consecutivo como senador por Alagoas. Ele se elegeu em 2006 e se reelegeu em 2014. Em 1989, foi o primeiro presidente da República eleito pelo voto direto após a ditadura militar. Permaneceu no cargo até 1992, quando sofreu um processo de impeachment. Antes, Collor tinha sido prefeito de Maceió (1979-1982), deputado federal (1982-1986) e governador de Alagoas (1987-1989). O ex-presidente anunciou a pré-candidatura em 19 de janeiro deste ano em discurso em Arapiraca (AL).');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 7, 'PRB', 'Flávio Rocha', 'O empresário Flávio Rocha, executivo das Lojas Riachuelo, se filiou ao PRB para disputar a Presidência da República. Ele é vice-presidente e diretor de Relações com Investidores da empresa Guararapes, que é dona da Riachuelo e encabeça um movimento chamado Brasil 200, que propõe uma agenda liberal na economia e conservadora nos costumes. Rocha exerceu duas vezes o mandato de deputado federal pelo Rio Grande do Norte, eleito em 1986 e em 1990. ');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 8, 'PSDB', 'Geraldo Alckmin', 'O atual governador de SP foi definido como pré-candidato à Presidência pelo PSDB depois de ser o único a se candidatar para disputar as prévias do partido. Médico de formação, Geraldo Alckmin começou a carreira pública em Pindamonhangaba, onde se elegeu vereador em 1973. Depois, foi prefeito da cidade e deputado estadual e federal por São Paulo. Em 1986, se elegeu deputado constituinte federal. Em 1988, deixou o PMDB, partido que integrava até então, para fundar o PSDB. Em 2001, assumiu o governo de São Paulo após a morte do então governador Mário Covas. Se reelegeu em 2002. Em 2006, Alckmin disputou a Presidência e perdeu para o então presidente Lula. Em 2010, elegeu-se novamente para o governo de São Paulo, reeleito em 2014. Em dezembro de 2017, foi eleito presidente nacional do PSDB e anunciou a pré-candidatura para o Palácio do Planalto.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 9, 'PSOL', 'Guilherme Boulos', 'Coordenador do Movimento dos Trabalhadores Sem-Teto (MTST), Guilherme Boulos foi lançado pré-candidato pelo Partido Socialismo e Liberdade (PSol) no dia 10 de março. Completa a chapa como candidata à vice-presidente a ativista indígena Sônia Guajajara. Boulos teve sua filiação ao partido formalizada cinco dias antes do anúncio e foi escolhido em conferência disputada com outros três nomes: Plínio de Arruda Sampaio Jr., Hamilton Assis e Nildo Ouriques. Formado em Filosofia pela Universidade de São Paulo (USP), Boulos tem 35 anos e, antes de se tornar líder do MTST, foi militante estudantil na União da Juventude Comunista.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 10, 'PSL', 'Jair Bolsonaro', 'No sétimo mandato como deputado federal, Jair Bolsonaro é um dos nomes mais fortes entre os pré-candidatos à Presidência. O capitão da reserva do Exército figura em segundo lugar nos cenários com Lula e lidera as intenções de voto sem o petista na maior parte das pesquisas presidenciais até o momento. O escolhido do PSL, no entanto, pode enfrentar problemas na Justiça: o parlamentar foi denunciado ao STF pela PGR por racismo praticado contra quilombolas, indígenas, refugiados, mulheres e LGBTs.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 11, 'NOVO', 'João Amoêdo', 'O empresário carioca de 55 anos fez carreira como executivo de empresas e, em novembro do ano passado, foi anunciado como pré-candidato a presidente do Partido Novo. João Amoêdo é um dos fundadores da sigla, que presidiu entre setembro de 2015 e julho de 2017, quando se afastou por causa da pré-candidatura. Formado em Engenharia Civil e Administração, teve a maior parte da atuação profissional em instituições financeiras. Foi vice-presidente do Unibanco e membro do conselho de administração do Itaú-BBA. Em 2011, passou a integrar o Conselho de Administração da construtora João Fortes. No mesmo ano, participou da fundação no Partido Novo.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 12, 'PPL', 'João Vicente Goulart', 'Filho do ex-presidente João Goulart, deposto pelo golpe militar de 1964, o pré-candidato do Partido Pátria Livre (PPL), João Vicente Goulart, fundou um instituto em homenagem ao pai e disputará a Presidência da República pela primeira vez. Ele é autor do livro Jango e Eu: Memórias de um exílio sem volta. Segundo a revista Época, João Vicente Goulart decidiu deixar o PDT no ano passado devido à insatisfação vom o atual presidente da sigla, o ex - ministro do Trabalho Carlos Lupi. Na nota em que anunciou a pré - candidatura, o PPL afirma que o país vive um momento de miséria, desindustrialização, devastação dos serviços públicos, terrível insegurança pública e o mais lastimável espetáculo de decadência moral.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 13, 'PRTB', 'Levy Fidelix', 'Formado em jornalismo, Levy Fidelix foi candidato a presidente da República em três eleições (1994, 2010 e 2014), mas nunca chegou ao segundo turno. Trabalhou na campanha de Fernando Collor à Presidência em 1989 e, desde então, também disputou eleições para deputado federal por São Paulo, vereador e prefeito, mas jamais se elegeu. Em 2014, prometeu que, se eleito presidente, acabaria com os impostos sobre remédios. Em 26 novembro de 2017, lançou pré-candidatura para disputar a Presidência pela quarta vez.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 14, 'PT', 'Luiz Inácio Lula da Silva', 'O metalúrgico e ex-sindicalista Luiz Inácio Lula da Silva pretende se candidatar à Presidência pela sexta vez. Ocupou o cargo por dois mandatos consecutivos (2003-2006 e 2007-2010) e conseguiu eleger como sucessora a ex-ministra Dilma Rousseff – que se reelegeu em 2014 e governou até 2016, quando sofreu impeachment. Fundador do PT em 1980, foi o primeiro presidente do partido. Em 1986, se elegeu deputado federal constituinte por São Paulo. Em julho do ano passado, Lula foi condenado a 9 anos e 6 meses de prisão pelo juiz Sérgio Moro acusado de corrupção passiva e lavagem de dinheiro em um processo da Lava Jato envolvendo um triplex em Guarujá (SP). Ele recorreu à segunda instância, que manteve a condenação e aumentou a pena para 12 anos de um mês. Lula nega todos os crimes e diz ser inocente. No dia seguinte à condenação no TRF-4, o PT anunciou Lula como pré-candidato à Presidência.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 15, 'PCdoB', 'Manuela D’Ávila', 'A jornalista de 36 anos Manuela D’Ávila iniciou a carreira política no movimento estudantil e foi vice-presidente da União Nacional dos Estudantes (UNE) em 2003. Em 2004, se elegeu vereadora em Porto Alegre. Dois anos depois, em 2006, foi eleita deputada federal, reeleita em 2010. Desde 2015, é deputada estadual no Rio Grande do Sul. A pré-candidatura à Presidência da República foi anunciada em 5 de novembro de 2017 pelo PCdoB. Ela disputou ainda duas vezes a prefeitura de Porto Alegre, em 2012 e 2018, mas não foi eleita. Será a primeira vez que o partido tem candidatura própria desde 1989. Até então, o PCdoB tinha integrado coligações encabeçada pelo PT e apoiado candidatos petistas como Lula e Dilma Rousseff.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 16, 'REDE', 'Marina Silva', 'Marina Silva foi deputada estadual no Acre (1991-1994) e senadora pelo mesmo estado por dois mandatos (1995 a 2010). Ela se licenciou do Senado de 2003 a 2008, quando ocupou o cargo de ministra do Meio Ambiente no governo Luiz Inácio Lula da Silva. Filiada ao PT desde 1986, deixou a legenda em 2009 para se filiar ao PV, partido pelo qual concorreu à Presidência em 2010, mas não conseguiu chegar ao segundo turno. Em 2014, se candidatou novamente, desta vez pelo PSB. À época, era vice na chapa encabeçada por Eduardo Campos, mas assumiu a candidatura após a morte dele em um acidente aéreo. Ficou em terceiro lugar. Anunciou pré-candidatura à Presidência em 2 de dezembro de 2017 durante encontro do partido Rede, do qual é fundadora.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 17, 'DEM', 'Rodrigo Maia', 'Atual presidente da Câmara dos Deputados, Rodrigo Maia (DEM-RJ) está no quinto mandato consecutivo como deputado federal. Assumiu a presidência da Câmara no ano passado, depois que o então presidente, Eduardo Cunha (PMDB-RJ), renunciou ao cargo – e depois foi cassado. Em 2017, Rodrigo Maia presidiu o DEM, partido que ajudou a fundar. É filho de Cesar Maia, ex-prefeito do Rio de Janeiro, e casado com Patricia Vasconcelos, enteada de Moreira Franco, ministro-chefe da Secretaria-Geral da Presidência. A pré-candidatura à Presidência de Rodrigo Maia foi anunciada pelo DEM no dia 8 de março.');",
      "INSERT INTO candidato (id_cargo, id_candidato, sigla_partido, nome, historico_candidato) VALUES (1, 18, 'PMN', 'Valéria Monteiro', 'Jornalista e ex-apresentadora do Jornal Nacional e do Fantástico nos anos 1990, Valéria Monteiro se filiou ao PMN em 12 de janeiro, em ato na Câmara Municipal de São Paulo. Atualmente é dona de uma produtora. Em setembro, quando ainda não estava filiada a partido político, anunciou que pretendia disputar a Presidência da República.');",
    ]).then(() => {
      console.log('dados inseridos')
    })
      .catch((erro) => {
        console.error(erro.message)
      }) 
  }

  //private getCandidato() {}
  
  public getCandidatosPresidente(db: SQLiteObject) {
    return db.executeSql("SELECT * FROM candidato, cargo WHERE candidato.id_cargo = cargo.id_cargo AND cargo.desc_cargo = 'Presidente'", {})
      .then((data: any) => {
        console.log(data.rows.length)
      })
      .catch((erro) => {
        console.error(erro.message)
      }) 
  }

}