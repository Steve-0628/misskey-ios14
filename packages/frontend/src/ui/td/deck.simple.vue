<template>
<div class="deck">
	<TDHeader :index="index" :kbs="kbs">
		<template #header>
			<slot name="header">test header</slot>
		</template>
	</TDHeader>
	<div class="main">
		<slot></slot>
	</div>
</div>
</template>

<script setup lang="ts">
import TDHeader from './header.vue';
const props = defineProps<{
	index: number;
	kbs: {
		selectedColumn: number,
		selectedRow: number,
	};
}>();
</script>

<style scoped>
.main {
	overflow-y: scroll;
}
</style>
