import { Router } from "express";
import { CreateMessageController } from "../controllers/create-mensagem.controller";
import { DestroyMessageController } from "../controllers/delete-one-mensagem.controller";
import { EditMessageController } from "../controllers/edit-one-mensagem.controller";
import { GetAllMessagesController } from "../controllers/get-all-mensagens.controller";
import { GetByUidMessageController } from "../controllers/get-one-mensagem.controller";
import { LoginUserVerification } from "../controllers/login-user-verification.controller";

export default class MensagemRoutes {
  public init(): Router {
    const routes = Router();

    routes.post("/mensagens/:userUid", new CreateMessageController().handle);
    routes.get("/mensagens/:userUid", new LoginUserVerification().handle);
    routes.get(
      "/mensagens/:userUid/all",
      new GetAllMessagesController().handle
    );
    routes.get(
      "/mensagens/:userUid/:uid",
      new GetByUidMessageController().handle
    );
    routes.put("/mensagens/:userUid/:uid", new EditMessageController().handle);
    routes.delete(
      "/mensagens/:userUid/:uid",
      new DestroyMessageController().handle
    );

    return routes;
  }
}
