<template>
<div>
	hello widgets!
	{{ column }}
</div>
</template>

<script setup lang="ts">
import { Column } from '../deck/deck-store';
const props = defineProps<{
	column: Column;
}>();
</script>
