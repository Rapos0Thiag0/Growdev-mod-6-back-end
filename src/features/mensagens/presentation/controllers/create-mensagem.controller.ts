import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/repositories/mensagem.repository";

export class CreateMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new MensagemRepository();

      const cache = new CacheRepository();

      const { userUid } = req.params;

      const mensagem = await repository.create({
        userUid: userUid,
        ...req.body,
      });

      const result = await cache.set(
        `Raposo:Mensagem:${mensagem?.uid}`,
        mensagem
      );

      if (!result) console.log("Não salvou no cache do Redis");

      await cache.delete(`Raposo:Mensagens:User:${userUid}:Lista`);

      return sucess(res, mensagem);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
