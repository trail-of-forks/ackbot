import onCheck from "./check";
import { onAppMention } from "./events";
import { App, ExpressReceiver, LogLevel } from "@slack/bolt";

const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	logLevel: LogLevel.INFO,
	receiver,
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

receiver.router.get('/check-reminers', async ( req, res ) => {
	res.status(200).send(await onCheck(req, res));
});

void (async () => {
	await app.start(Number(process.env.PORT) || 3000);

	console.log("⚡️ Ackbot is running!");
})();
