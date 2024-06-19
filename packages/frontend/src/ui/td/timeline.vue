<template>
<Deck :items="notes">
	<template #header>
		<span>Timeline</span>
	</template>
	<template #default="{ item }">
		<span>{{ item.user.name ?? item.user.username }} @{{ item.user.username }}</span>
		<div>{{ item.text }}</div>
		<br><br>
	</template>
</Deck>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Connection } from 'misskey-js/built/streaming';
import { entities } from 'misskey-js';
import Deck from '../td/deck.vue';
import { Column } from '../deck/deck-store';
import { useStream } from '@/stream';
import { api } from '@/os';

const props = defineProps<{
	column: Column;
}>();

const notes = ref<entities.Note[]>([]);

const stream = useStream();
let connection: Connection;

switch (props.column.tl) {
	case 'home':
		api('notes/timeline').then(resp => {
			notes.value.push(...resp);
		});
		connection = stream.useChannel('homeTimeline');
		connection.on('note', ((note) => {
			console.log(note);
			notes.value.unshift(note);
		}));
		break;
	default:
		alert('not supported! (TL other than home)');
		break;
}

onUnmounted(() => {
	connection.dispose();
});

</script>
