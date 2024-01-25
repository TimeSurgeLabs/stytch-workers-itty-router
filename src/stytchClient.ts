import { Client, envs } from 'stytch';

import { Env } from './env';
// hacky fix to get around CF workers issue
//@ts-ignore
import monkeyPatchStytchClientSettings from './utils/stytchClientFix';

const getClient = (env: Env) => {
	const { STYTCH_PROJECT_ID, STYTCH_SECRET, STYTCH_ENV } = env;

	if (!STYTCH_PROJECT_ID || !STYTCH_SECRET) {
		throw new Error('Missing Stytch credentials');
	}

	const client = new Client({
		project_id: STYTCH_PROJECT_ID,
		secret: STYTCH_SECRET,
		env: STYTCH_ENV === 'production' || STYTCH_ENV === 'live' ? envs.live : envs.test,
	});

	monkeyPatchStytchClientSettings(client);

	return client;
};

export default getClient;
