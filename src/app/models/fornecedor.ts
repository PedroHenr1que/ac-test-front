export interface Fornecedor {
    id?: number;
    nome: string;
    email: string;
    cep: string;
    tipo: 'FISICA' | 'JURIDICA';
    documento: string;
    rg?: string;
    dataNascimento?: string;
  }