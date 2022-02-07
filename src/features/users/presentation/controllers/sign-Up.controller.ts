import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  badRequest,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { UserRepository } from "../../infra/repositories/user.repository";

export class SignUpUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    const data = req.body;

    if (data.senha !== data.senha2) {
      return badRequest(res, "NOT_MATCH_PASS_ERROR");
    }
    if (!data.nome || !data.senha || !data.senha2) {
      return badRequest(res, "EMPTY_FIELDS_ERROR");
    }
    if (data.senha.length < 8 || data.senha.length > 12) {
      return badRequest(res, "LENGHT_PASS_ERROR");
    }

    try {
      const repository = new UserRepository();

      const user = await repository.signUp(req.body);

      return sucess(res, user);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
