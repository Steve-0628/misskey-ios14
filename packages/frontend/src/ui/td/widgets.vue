<template>
<TDDeckSimple>
	<template #header>
		Widgets
	</template>
	<template #default>
		nakami ha nai desu
	</template>
</TDDeckSimple>
</template>

<script setup lang="ts">
import TDDeckSimple from '../td/deck.simple.vue';
import { Column } from '../deck/deck-store';
const props = defineProps<{
	column: Column;
}>();
</script>
