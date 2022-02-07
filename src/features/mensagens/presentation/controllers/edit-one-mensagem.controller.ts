import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  badRequest,
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/mensagem.repository";

export class EditMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    const data = req.body;
    console.log(data);

    if (!data.descricao || !data.detalhamento) {
      return badRequest(res, "EMPTY_FIELDS_ERROR");
    }
    try {
      const { uid, user_uid } = req.params;
      const repository = new MensagemRepository();

      const mensagem = await repository.editMessage({
        uid,
        userUid: user_uid,
        ...req.body,
      });

      if (!mensagem) return notFound(res, "MESSAGE_NOT_FOUND");

      const cache = new CacheRepository();
      await cache.delete(`Raposo:Mensagem:${uid}`);
      await cache.delete("Raposo:Mensagens:Lista");

      console.log(mensagem);
      return sucess(res, mensagem);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
