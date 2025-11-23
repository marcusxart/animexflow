import winston, { format, Logger } from "winston";
import path from "path";

// Generate today's date string
const today = new Date().toISOString().split("T")[0];

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

/**
 * Winston logger instance
 */
const logger: Logger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),

    new winston.transports.File({
      filename: path.join("logs", `${today}-error.log`),
      level: "error",
    }),

    new winston.transports.File({
      filename: path.join("logs", `${today}-combined.log`),
    }),
  ],
});

export default logger;
