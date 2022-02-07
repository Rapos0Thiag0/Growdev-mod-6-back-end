import { Router } from "express";
import { SignUpUserController } from "../controllers/sign-Up.controller";
import { SignInUserController } from "../controllers/sign-In.controller";
import { GetAllUsersController } from "../controllers/get-all-users.controller";

export default class UserRoutes {
  public init(): Router {
    const routes = Router();

    routes.post(
      "/signup",
      new SignUpUserController().handle
    ); /* chamada no front no arquivo novaConta */
    routes.post(
      "/signin",
      new SignInUserController().handle
    ); /* chamada no front no arquivo login */
    routes.get(
      "/users",
      new GetAllUsersController().handle
    ); /* rota para conferir users - DEV */

    return routes;
  }
}
