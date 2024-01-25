import { type IRequest, json, error } from 'itty-router';

import { Env } from '../env';
import getClient from '../stytchClient';

// the difference is we may have the user
// specify a display name
type SignUpBody = {
	email: string;
	password: string;
};

const signup = async (req: IRequest, env: Env) => {
	const client = getClient(env);

	const body = await req.json<SignUpBody>();
	if (!body.email || !body.password) {
		return error(400, 'Missing email or password');
	}

	const resp = await client.passwords.create(body);

	if (resp.status_code !== 200) {
		return error(401, 'Unauthorized');
	}

	return json(resp);
};

export default signup;
