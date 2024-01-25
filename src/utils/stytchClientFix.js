// I didn't want to do this - Chandler
// See here: https://github.com/stytchauth/stytch-node/issues/273#issuecomment-1771408258

export default function monkeyPatchStytchClientSettings(client) {
	/* eslint-enable */
	client.fetchConfig.cache = undefined;
}
