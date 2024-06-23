<template>
<TDDeckSimple :index="index" :kbs="kbs">
	<template #header>
		Widgets
	</template>
	<template #default>
		<textarea id="td_compose_area" ref="inputElRef" v-model="inputValue" :disabled="isPosting"></textarea>
		nakami ha nai desu<br/>
	</template>
</TDDeckSimple>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TDDeckSimple from '../td/deck.simple.vue';
import * as os from '@/os';

const props = defineProps<{
	index: number;
	kbs: {
		selectedColumn: number,
		selectedRow: number,
	};
}>();

const inputElRef = ref<HTMLTextAreaElement | null>(null);
const inputValue = ref('');

let isPosting = false;

function focusComposer(): void {
	inputElRef.value?.focus();
}

function hotkeyHandler(key: KeyboardEvent): void {
	if (document.activeElement && document.activeElement.id === 'td_compose_area') {
		if ((key.ctrlKey || key.metaKey) && key.key === 'Enter') {
			isPosting = true;
			os.api('notes/create', {
				text: inputValue.value,
			}).then(() => {
				inputValue.value = '';
				isPosting = false;
			}).catch(err => {
				isPosting = false;
				os.alert({
					type: 'error',
					text: JSON.stringify(err),
				});
			});
			return;
		}

		if (key.key === 'Escape') {
			document.activeElement.blur(); // this works but why?
		}
	}
	if (document.activeElement) {
		if (['input', 'textarea'].some(el => document.activeElement && document.activeElement.matches(el))) return;
		if (document.activeElement.attributes['contenteditable']) return;
	}

	switch (key.code) {
		case 'KeyN':
			focusComposer();
			key.preventDefault();
			break;

		default:
			break;
	}
}

document.addEventListener('keydown', hotkeyHandler);

</script>
