<template>
<div class="deck">
	<TDHeader>
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
</script>

<style scoped>
.main {
	overflow-y: scroll;
}
</style>
