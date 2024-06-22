<template>
<TDDeckSimple :index="index" :kbs="kbs">
	<template #header>
		Widgets
	</template>
	<template #default>
		nakami ha nai desu<br/>
		<textarea></textarea>
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
