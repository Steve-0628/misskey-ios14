import { defaultStore } from '@/store';
import * as os from '@/os';

export async function getFriends(): Promise<Friend[]> {
	// const url = 'https://api.vrchat.cloud/api/1/auth/user/friends?offline=false';
	// const options = {
	// 	headers: {
	// 		apiKey: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26',
	// 		authToken: defaultStore.state.VRChatToken,
	// 	},
	// };

	// return fetch(url, options)
	// 	.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error(`Request failed with status code ${response.status}`);
	// 		}
	// 		return response.json();
	// 	})
	// 	.then(data => {
	// 		return data;
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});
}

export async function fetchToken(user: string, password: string): Promise<object> {
	return os.api('vrchat', {
		requestType: 'fetchToken',
		user,
		password,
	});

	// fetch('https://api.vrchat.cloud/api/1/auth/user', {
	// 	headers: {
	// 		apiKey: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26',
	// 		Authorization: 'Basic ' + (btoa(unescape(encodeURIComponent(`${user}:${password}`)))),
	// 	},
	// })
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			throw new Error(`Request failed with status code ${response.status}`);
	// 		}
	// 		const token = response.headers.get('Set-Cookie');
	// 		if (token) {
	// 			defaultStore.state.VRChatToken = token;
	// 			os.confirm({
	// 				type: 'info',
	// 				text: `${token}`,
	// 			});
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});
}

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
