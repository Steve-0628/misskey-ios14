<template>
<div class="_gaps_m">
	<MkInfo>
		<a href="https://github.com/yu256/vrcapi_proxy" target="_blank" rel="noopener">
			プロキシの詳細
			<i class="ti ti-external-link"/>
		</a>
	</MkInfo>
	<FormSection>
		<div class="_gaps_s">
			<div class="_margin">トークンを設定</div>
			<MkInput v-model="VRChatURL" type="text" placeholder="プロキシサーバーのURL https://hoge.com/"/>
			<span v-if="!token" class="_gaps_s">
				<MkInput v-model="username" type="text" placeholder="ユーザーネームもしくはメールアドレス"/>
				<MkInput v-model="password" type="password" placeholder="パスワード"/>
				<MkButton @click="auth">決定</MkButton>
			</span>
			<span v-else class="_gaps_s">
				<MkInput v-model="token" readonly/>
				<MkInput v-model="twofactortype" readonly/>
				<MkInput v-model="twofactor" type="text" placeholder="2FAコード"/>
				<MkButton @click="do2fa">決定</MkButton>
			</span>
			<div class="_margin">認証ID</div>
			<MkInput v-model="VRChatAuth" type="text">
				<template #caption>AuthTokenのキーとなります。複数のクライアントで同じ文字列を入力することで同一のトークンを使用することが可能です。任意の文字列を入力してください。</template>
			</MkInput>
		</div>
	</FormSection>
</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { defaultStore } from '@/store';
import MkInfo from '@/components/MkInfo.vue';
import FormSection from '@/components/form/section.vue';
import MkInput from '@/components/MkInput.vue';
import MkButton from '@/components/MkButton.vue';
import { alert as miAlert } from '@/os';
import { fetchData, fetchDataWithAuth } from '@/scripts/vrchat-api';

const VRChatAuth = computed<string>(defaultStore.makeGetterSetter('VRChatAuth'));
const VRChatURL = computed<string>(defaultStore.makeGetterSetter('VRChatURL'));

const username = ref('');
const password = ref('');
const token = ref('');
const twofactor = ref('');
const twofactortype = ref('');

async function auth(): Promise<void> {
	if (!username.value || !password.value) return;

	const body = {
		username: username.value,
		password: password.value,
	};
	const res = await fetchData('auth', body);
	if (!res) return;
	token.value = res.token;
	twofactortype.value = res.auth_type;

	miAlert({
		type: 'info',
		text: '二段階認証が必要です。',
	});
}

async function do2fa(): Promise<void> {
	if (!twofactor.value || !VRChatAuth.value) return;

	const body = {
		auth: VRChatAuth.value,
		token: token.value,
		two_factor_code: twofactor.value,
		two_factor_type: twofactortype.value,
	};
	const res = await fetchDataWithAuth('twofactor', body);
	if (!res) return;
	defaultStore.set('VRChatAuth', res);

	miAlert({
		type: 'success',
		text: '二段階認証が完了しました。',
	});
}

</script>
