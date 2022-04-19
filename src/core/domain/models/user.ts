import { Mensagem } from "./mensagem";

export interface User {
  uid: string;
  nome: string;
  senha: string;
  mensagens?: Mensagem[];
}
