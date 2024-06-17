<template>
<div>
	{{ column }}
	<div v-for="notification in notifications" :key="notification.id">
		<div v-if="notification.type=='mention'">
			Mention: {{ notification.note }}
		</div>
		<div v-else>
			Unknown Notification Type: {{ notification.type }}
		</div>
	</div>
</div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { entities } from 'misskey-js';
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
