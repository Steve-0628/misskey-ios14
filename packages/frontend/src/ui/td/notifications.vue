<template>
<Deck :items="notifications">
	<template #header>
		<span>Notification</span>
	</template>
	<template #default="{item}">
		<div v-if="item.type=='mention'">
			Mention: {{ item.note }}
		</div>
		<div v-else>
			Unknown Notification Type: {{ item.type }}
		</div>
	</template>
</Deck>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { entities } from 'misskey-js';
import Deck from '../td/deck.vue';
import { Column } from '../deck/deck-store';
import { useStream } from '@/stream';
import { api } from '@/os';

const props = defineProps<{
	column: Column;
}>();

const notifications = ref<entities.Notification[]>([]);

api('i/notifications').then(resp => {
	notifications.value.push(...resp);
});

const connection = useStream().useChannel('main');
connection.on('notification', (notification) => {
	notifications.value.unshift(notification);
});

onUnmounted(() => {
	connection.dispose();
});

</script>
