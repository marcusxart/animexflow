import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes.ts";
import globalErrorHandler from "./middlewares/error.middleware.ts";
import requestLoggerMiddleware from "./middlewares/requestLogger.middleware.ts";
import chalk from "chalk";
dotenv.config();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";

const app = express();
app.use(express.json());

if (ENV === "development") {
  app.use(requestLoggerMiddleware);
}

app.use("/api/v1", routes);

app.use(globalErrorHandler);

(() => {
  app.listen(PORT, () => {
    if (ENV === "development")
      console.log(chalk.green(`🚀 Server running on http://localhost:${PORT}`));
  });
})();
