import type { Request, Response, NextFunction } from "express";
import chalk from "chalk";

const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;

    // Calculate minutes and remaining seconds
    const totalSeconds = Math.floor(durationMs / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    // Format the string: e.g., "1m 15s" or just "15s"
    const timeLabel = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

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
        durationMs + "ms"
      )} ${chalk.gray("[" + timeLabel + "]")}`
    );
  });

  next();
};

export default requestLoggerMiddleware;
