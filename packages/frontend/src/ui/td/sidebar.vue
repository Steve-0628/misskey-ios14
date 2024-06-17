<template>
<div>
	this is the sidebar
	<button @click="backToDeck">
		deck
	</button>
</div>
</template>

<script setup lang="ts">
import * as DeckStore from '../deck/deck-store';
import { miLocalStorage } from '@/local-storage';
import { unisonReload } from '@/scripts/unison-reload';
function backToDeck(): void {
	DeckStore.deckStore.set('profile', 'default');
	miLocalStorage.setItem('ui', 'deck');
	unisonReload();
}
</script>
