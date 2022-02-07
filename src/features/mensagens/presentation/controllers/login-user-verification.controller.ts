import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/mensagem.repository";

export class LoginUserVerification implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { user_uid } = req.params;

      const repository = new MensagemRepository();

      const loggedUser = await repository.getLoggedUser(user_uid);

      if (!loggedUser.uid) return notFound(res, "USER_NOT_LOGGED");

      return sucess(res, loggedUser.uid);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
