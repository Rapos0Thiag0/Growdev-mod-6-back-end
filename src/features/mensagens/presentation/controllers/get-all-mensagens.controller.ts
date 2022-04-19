import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { Mensagem } from "../../../../core/domain/models/mensagem";
import { MensagemRepository } from "../../infra/repositories/mensagem.repository";

export class GetAllMessagesController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { userUid } = req.params;

      const cache = new CacheRepository();

      const mensagensCache = await cache.get(
        `Raposo:Mensagens:User:${userUid}:Lista`
      );

      if (mensagensCache) {
        return sucess(
          res,
          (mensagensCache as Mensagem[]).map((mensagem) => mensagem)
        );
      }

      const repository = new MensagemRepository();

      const mensagens = await repository.getAllMessages(userUid);

      if (mensagens.length === 0) return notFound(res, "MESSAGES_NOT_FOUND");

      await cache.set(`Raposo:Mensagens:User:${userUid}:Lista`, mensagens);

      return sucess(res, mensagens);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
