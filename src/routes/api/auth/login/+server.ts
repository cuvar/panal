import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json();

	const token = jwt.sign({ username: username }, env.JWT_SECRET);

	if (username !== env.USER_HASH || password !== env.PASSWORD_HASH) {
		return json({ message: 'Invalid username or password' }, { status: 401 });
	}

	const period = Number(env.TOKEN_PERIOD);
	return json({ token: token, tokenHours: period > 0 ? period : 24 });
};
