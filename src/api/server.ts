import express, { Request, Response } from "express";
import onEvent from "./events";
import { onAppMention } from "./events";
import {
	App,
	LogLevel,
	subtype,
	BotMessageEvent,
	BlockAction,
} from "@slack/bolt";

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	logLevel: LogLevel.INFO,
	customRoutes: [
		{
			path: "/healthz",
			method: ["GET"],
			handler: (req, res) => {
				res.writeHead(200);
			},
		},
	],
});

app.use(async ({ next }) => {
	await next();
});

app.event("app_mention", async ({ event, logger }) => {
	let response: unknown = {};
	let code = 400;
	({ response, code } = await onAppMention(event));
	logger.info(response);
});

void (async () => {
	await app.start(Number(process.env.PORT) || 3000);

	console.log("⚡️ Ackbot is running!");
})();
