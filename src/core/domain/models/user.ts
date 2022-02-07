import { MensagemEntity } from "../../infra/data/database/entities/mensagem";

export interface User {
  uid: string;
  nome: string;
  senha: string;
  mensagens?: Array<MensagemEntity>;
}
