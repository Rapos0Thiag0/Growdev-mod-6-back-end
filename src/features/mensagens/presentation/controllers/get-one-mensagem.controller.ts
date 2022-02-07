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

export class GetByUidMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid } = req.params;

      const cache = new CacheRepository();

      const mensagensCache: Mensagem = await cache.get(
        `Raposo:Mensagem:${uid}`
      );

      if (mensagensCache) {
        return sucess(res, mensagensCache);
      }

      const repository = new MensagemRepository();
      const mensagem = await repository.getByUid(uid);

      if (!mensagem) return notFound(res, "MESSAGE_NOT_FOUND");

      await cache.set(`Raposo:Mensagem:${mensagem.uid}`, mensagem);

      return sucess(res, mensagem);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
