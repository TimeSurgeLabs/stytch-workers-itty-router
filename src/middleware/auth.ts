import { IRequest, error } from 'itty-router';

import getClient from '../stytchClient';
import { Env } from '../env';

export const withAuthenticatedUser = async (req: IRequest, env: Env) => {
	// get the jwt or session token from the header
	const token = req.headers.get('Authorization');

	if (!token) {
		return error(401, 'Unauthorized');
	}

	const client = getClient(env);

	// verify the token
	try {
		const resp = await client.sessions.authenticateJwtLocal({
			session_jwt: token,
		});

		req.session = resp;
	} catch (e) {
		return error(401, 'Unauthorized');
	}
};
