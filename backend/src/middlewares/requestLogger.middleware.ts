import type { Request, Response, NextFunction } from "express";
import chalk from "chalk";

const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    let statusColor: (text: string | number) => string;
    let statusEmoji = "";
    if (res.statusCode >= 500) {
      statusColor = chalk.red;
      statusEmoji = "❌";
    } else if (res.statusCode >= 400) {
      statusColor = chalk.yellow;
      statusEmoji = "⚠️";
    } else if (res.statusCode >= 300) {
      statusColor = chalk.cyan;
      statusEmoji = "➡️";
    } else {
      statusColor = chalk.green;
      statusEmoji = "✅";
    }

    console.log(
      `${chalk.blue(req.method)} ${chalk.magenta(
        req.originalUrl
      )} ${statusColor(res.statusCode)} ${statusEmoji} - ${chalk.white(
        duration + "ms"
      )}`
    );
  });

  next();
};

export default requestLoggerMiddleware;
