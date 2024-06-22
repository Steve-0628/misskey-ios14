<template>
<TDDeckSimple :kbs="kbs" :index="index">
	<template #header>
		FakeChannel
	</template>
	<template #default>
		fake channel column for debugging
	</template>
</TDDeckSimple>
</template>

<script setup lang="ts">
import TDDeckSimple from '../td/deck.simple.vue';
const props = defineProps<{
	index: number;
	kbs: {
		selectedColumn: number,
		selectedRow: number,
	};
}>();
</script>
