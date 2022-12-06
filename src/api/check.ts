import { Request, Response } from "express";
import { checkForReminders } from './_acks';
import { ACKBOT_CHECK_TOKEN } from './_constants';
import { cleanReq, getHeader, toHeaders } from './_util';

export default async function onCheck(req: Request, res: Response) {
	const headers = toHeaders(req.headers);
	const verify = getHeader('x-ackbot-verify', headers);
	if (!verify) {
		console.error('Missing verify: ', { req: cleanReq(req) });
		res.status(403).send({ msg: 'Missing verify header.'});
		return;
	}
	if (verify !== ACKBOT_CHECK_TOKEN) {
		console.error('Invalid verify: ', { verify, req: cleanReq(req) });
		res.status(403).send({ msg: 'Invalid verify header.'});
		return;		
	}

	try {
		res.status(200).send(await checkForReminders());
	} catch (e) {
		console.error('Unexpected error: ', { error: e, req: cleanReq(req) });
		res.status(500).send({ msg: 'Unexpected error' });
	}
}
