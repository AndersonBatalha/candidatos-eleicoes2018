export class Candidato {
    id: number;
    nome: string;
    partido: string;
    siglaPartido: string;
    cargo: string;
    historicoCandidato: string;
}

export class Governador extends Candidato {
    UFestado: string;
    estado: string;
}
