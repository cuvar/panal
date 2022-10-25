import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request }) => {
	const { token } = await request.json();

	jwt.verify(token, env.JWT_SECRET, (err: any, decoded: any) => {
		if (err) {
			return json({ message: 'Invalid token' }, { status: 401 });
		}

		if (decoded.username !== env.USER_HASH) {
			return json({ message: 'Invalid username' }, { status: 401 });
		}
	});

	return json({ message: 'success' }, { status: 200 });
};
