import express, { Request, Response } from "express";
import onEvent from "./events";

const app = express();

app.get("/api/event", function (req: Request, res: Response) {
	return onEvent(req, res);
});

app.get("/healthz", function (req: Request, res: Response) {
	res.sendStatus(200);
});

app.listen(3000, function () {
	console.log("ackbot started");
});
