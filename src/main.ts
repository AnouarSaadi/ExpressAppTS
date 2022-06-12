import { App } from "./app";
import { DotEnvConfig } from "./config/dot-env.config";

const bootstrap = async () => {
    const app: App = App.getInstance();
    app.listen(DotEnvConfig.PORT);
}

bootstrap();