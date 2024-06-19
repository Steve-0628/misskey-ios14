<template>
<div class="deck">
	<TDHeader>
		<template #header>
			<slot name="header">test header</slot>
		</template>
	</TDHeader>
	<div class="main">
		<template v-if="items && items.length > 0">
			<div v-for="item in items" :key="item.id">
				<slot :item="item"></slot>
			</div>
		</template>
		<div v-else>
			Loading...
		</div>
	</div>
</div>
</template>

<script setup lang="ts">
import TDHeader from './header.vue';
import { MisskeyEntity } from '@/types/date-separated-list';
const props = defineProps<{
	items: MisskeyEntity[]
}>();
</script>

<style scoped>
.main {
	overflow-y: scroll;
}
</style>
