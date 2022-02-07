import App from "./core/presentation/app";
import Redis from "./core/infra/data/connections/Redis";
import Database from "./core/infra/data/connections/Database";
import "dotenv/config";

Promise.all([new Database().openConnection(), new Redis().openConnection()])
  .then(() => {
    const app = new App();
    app.init();
    app.start(process.env.PORT || "4444");
  })
  .catch((err) => {
    console.log(err);
  });
