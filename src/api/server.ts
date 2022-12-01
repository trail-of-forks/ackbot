import express, { Request, Response } from "express";
import onEvent from "./events";

const app = express();

app.get("/", function (req: Request, res: Response) {
	return onEvent(req, res);
});

app.listen(3000, function () {
	console.log("ackbot started");
});
