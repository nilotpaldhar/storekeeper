import winston from "winston";
import { env } from "@/lib/env";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const logger = winston.createLogger({
	level: env.NODE_ENV === "production" ? "info" : "debug",
	format: combine(
		timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		errors({ stack: true }),
		env.NODE_ENV === "production"
			? json()
			: combine(
					colorize({ all: true }),
					printf(({ level, message, timestamp, stack, ...meta }) => {
						const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";
						return `${timestamp} ${level}: ${stack || message} ${metaString}`;
					})
				)
	),
	transports: [new winston.transports.Console()],
});

export { logger };
