import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/mensagem.repository";

export class DestroyMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid, user_uid } = req.params;

      const cache = new CacheRepository();

      const repository = new MensagemRepository();
      const mensagem = await repository.destroy(uid, user_uid);

      if (!mensagem) return notFound(res, "MESSAGE_NOT_FOUND");

      await cache.delete(`Raposo:Mensagens:Lista`);
      await cache.delete(`Raposo:Mensagem:${uid}`);

      return sucess(res, mensagem);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
