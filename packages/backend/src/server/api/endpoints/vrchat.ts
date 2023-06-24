import { Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';

export const meta = {
	requireCredential: true,

	tags: ['meta'],

	res: {
		type: 'object',
		optional: false, nullable: true,
		properties: {
			response: {
				type: 'object',
				optional: false, nullable: true,
			},
		},
	},
} as const;

async function getFriends(token :string): Promise<Friend[]> {
	const url = 'https://api.vrchat.cloud/api/1/auth/user/friends?offline=false';
	const options = {
		headers: {
			apiKey: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26',
			authToken: token,
		},
	};

	return fetch(url, options)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Request failed with status code ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

async function fetchToken(user: string, password: string): Promise<JSON> {
	const res = await fetch('https://api.vrchat.cloud/api/1/auth/user', {
		headers: {
			// apiKey: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26',
			Authorization: 'Basic ' + (btoa(unescape(encodeURIComponent(`${user}:${password}`)))),
			UserAgent: 'vrc-ts',
			Accept: 'application/json',
			ContentType: 'application/json',
		},
	});

	const resp = await res.json();
	try {
		resp.authToken = res.headers.get('set-cookie')!.split(';')[0].split('=')[1];
	} catch (e) {
		console.log(e);
	}
	if (!res.ok) {
		console.log(res.headers, res.status, resp );
	} else {
		console.log(res.headers, res.status, resp );
	}

	return resp;
}

export const paramDef = {
	type: 'object',
	properties: {
		requestType: { type: 'string', enum: ['getFriends', 'fetchToken', 'email2fa'] },
		token: { type: 'string', nullable: true },
		twofactor: { type: 'string', nullable: true },
		user: { type: 'string', nullable: true },
		password: { type: 'string', nullable: true },
	},
	required: [],
} as const;

export interface Friend {
	bio: string;
	currentAvatarImageUrl: string;
	currentAvatarThumbnailImageUrl: string;
	developerType: string;
	displayName: string;
	fallbackAvatar: string;
	id: string;
	isFriend: boolean;
	last_platform: string;
	profilePicOverride: string;
	status: string;
	statusDescription: string;
	tags: string[];
	userIcon: string;
	location: string;
	friendKey: string;
}

// eslint-disable-next-line import/no-default-export
@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> {
	constructor(
	) {
		super(meta, paramDef, async (ps) => {
			const requestType = ps.requestType;
			if (requestType === 'getFriends') {
				const friends = await getFriends(ps.token as string);
				return {
					response: friends,
				};
			} else if (requestType === 'fetchToken') {
				const resp = await fetchToken(ps.user as string, ps.password as string);
				if ('requiresTwoFactorAuth' in resp) {
					return {
						response: resp,
					};
				} else {
					return {
						response: resp,
					};
				}
			} else if ( requestType === 'email2fa') {
				const authtoken = ps.token as string;
				const twofactor = ps.twofactor as string;

				console.log(authtoken, twofactor);

				const res = await fetch('https://api.vrchat.cloud/api/1/auth/twofactorauth/emailotp/verify', {
					method: 'POST',
					headers: {
					// apiKey: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26',
						// Authorization: 'Basic ' + (btoa(unescape(encodeURIComponent(`${user}:${password}`)))),
						UserAgent: 'vrc-ts',
						Accept: 'application/json',
						ContentType: 'application/json',
						Cookie: 'auth=' + authtoken.trim(), //TODO なんか500が帰ってくる
					},
					body: JSON.stringify({
						'code': twofactor,
					}),
				});
				const resp = await res.text();
				console.log(res.headers, res.status, resp);
				return {
					response: resp,
				};
			} else {
				return {
					response: 'Invalidddddd',
				};
			}
		});
	}
}
