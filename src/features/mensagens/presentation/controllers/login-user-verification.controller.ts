import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/repositories/mensagem.repository";

export class LoginUserVerification implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { userUid } = req.params;

      const repository = new MensagemRepository();

      const loggedUser = await repository.getLoggedUser(userUid);

      if (!loggedUser) return notFound(res, "USER_NOT_LOGGED");

      return sucess(res, loggedUser);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
