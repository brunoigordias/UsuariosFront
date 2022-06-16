
export class Usuario {

    constructor() {
        this.id = "0";
        this.nome = "";
        this.sobrenome = "";        
        this.email = "";
        this.dataNascimento = new Date;
        this.escolaridadeId = "";
        this.historicoEscolarId = "";
    }

    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    dataNascimento: Date;
    escolaridadeId: string;
    historicoEscolarId:string;
}