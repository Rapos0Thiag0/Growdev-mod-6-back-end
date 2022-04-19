import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  badRequest,
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { UserRepository } from "../../infra/repositories/user.repository";

export class SignInUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new UserRepository();
      const data = req;
      console.log(data);      

      const user = await repository.signIn(req.body);
      console.log(user);

      if (!user) return notFound(res, "USER_NOT_FOUND_ERROR");
      if (user.senha !== req.body.senha) return badRequest(res, "PASS_ERROR");

      return sucess(res, user);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
