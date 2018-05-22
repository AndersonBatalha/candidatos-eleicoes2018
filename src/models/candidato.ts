export class Candidato {
    id: number;
    nome: string;
    siglaPartido: string;
    nomePartido: string;
    historico: string;
}

export class Governador extends Candidato {
    uf: string;
    estado: string;
}