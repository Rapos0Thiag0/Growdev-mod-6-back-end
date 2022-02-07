import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { UserRepository } from "../../infra/repositories/user.repository";

export class GetAllUsersController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new UserRepository();

      const users = await repository.getAll();

      if (users.length === 0) return notFound(res);

      return sucess(res, users);
    } catch (err: any) {
      console.log(res);
      return serverError(res, err);
    }
  }
}
