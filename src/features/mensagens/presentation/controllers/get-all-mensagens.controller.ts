import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { Mensagem } from "../../domain/models/mensagem";
import { MensagemRepository } from "../../infra/mensagem.repository";

export class GetAllMessagesController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const cache = new CacheRepository();

      const mensagensCache = await cache.get("Raposo:mensagens:Lista");

      if (mensagensCache) {
        return sucess(
          res,
          (mensagensCache as Mensagem[]).map((mensagem) => mensagem)
        );
      }

      const { user_uid } = req.params;

      const repository = new MensagemRepository();

      const mensagens = await repository.getAllMessages(user_uid);

      if (mensagens.length === 0) return notFound(res, "MESSAGES_NOT_FOUND");

      await cache.set(`Raposo:Mensagens:Lista`, mensagens);

      sucess(res, mensagens);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
