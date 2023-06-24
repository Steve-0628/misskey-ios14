<template>
<span v-user-preview="friend.id" class="_noSelect" :class="[$style.root, { [$style.square]: squareAvatars }]">
	<img class="inner" :src="friend.currentAvatarImageUrl" decoding="async"/>
	<div 
		v-tooltip="friend.status" :class="[$style.root, {
			[$style.join]: friend.status === 'active',
			[$style.active]: friend.status === 'join me',
			[$style.ask]: friend.status === 'ask me',
			[$style.busy]: friend.status === 'busy',
		}]"
	/>
</span>
</template>

<script lang="ts" setup>
import { defaultStore } from '@/store';
import { Friend } from '@/scripts/vrchat-api';

defineProps<{
	friend: Friend;
}>();

const squareAvatars = $ref(defaultStore.state.squareAvatars);

</script>

<style lang="scss" module>

.root {
	position: relative;
	display: inline-block;
	vertical-align: bottom;
	flex-shrink: 0;
	border-radius: 100%;
	line-height: 16px;
}

.inner {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	border-radius: 100%;
	z-index: 1;
	overflow: clip;
	object-fit: cover;
	width: 100%;
	height: 100%;
}

.indicator {
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
	width: 20%;
	height: 20%;
}

.square {
	border-radius: 20%;

	> .inner {
		border-radius: 20%;
	}
}

.join {
	background: #58d4c9;
}

.active {
	background: rgb(26, 182, 26);
}

.ask {
	background: #e4bc48;
}
.busy {
	background: rgb(113, 5, 5);
}

</style>
