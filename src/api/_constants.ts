import Redis from 'ioredis';
import { WebClient } from '@slack/web-api';

export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;

export const ACKBOT_VERIFY = process.env.ACKBOT_VERIFY;

export const redis = new Redis({
	port: Number(process.env.REDIS_PORT) || 6379,
	family: Number(process.env.REDIS_IP_FAMILY) || 6,
	host: process.env.REDIS_HOST,
	username: process.env.REDIS_USER || "default",
	password: process.env.REDIS_PASSWORD || undefined,
	connectTimeout: 10000,
});

export const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
