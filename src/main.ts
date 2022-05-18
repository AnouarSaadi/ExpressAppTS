import { App } from "./app";
import dotenv from "dotenv";

dotenv.config();
const bootstrap = async () => {
    const app: App = App.getInstance();

    app.listen(Number(process.env.SERVER_PORT));
}

bootstrap();