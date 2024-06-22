<template>
<div class="header">
	<slot name="header">test header</slot>
	<span>{{ index }}<template v-if="index === kbs.selectedColumn">!!!</template></span>
</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	index: number;
	kbs: {
		selectedColumn: number,
		selectedRow: number,
	};
}>();
</script>

<style scoped>
.header {
	height: 50px;
}
</style>
