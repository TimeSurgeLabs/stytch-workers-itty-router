import { type IRequest, json, error } from 'itty-router';

import { Env } from '../env';
import getClient from '../stytchClient';

type LoginBody = {
	email: string;
	password: string;
};

const login = async (req: IRequest, env: Env) => {
	const client = getClient(env);

	const body = await req.json<LoginBody>();
	if (!body.email || !body.password) {
		return error(400, 'Missing email or password');
	}

	const resp = await client.passwords.authenticate({ ...body, session_duration_minutes: 60 });

	if (resp.status_code !== 200) {
		return error(401, 'Unauthorized');
	}

	return json(resp);
};

export default login;
