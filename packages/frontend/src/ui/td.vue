<template>
<div>
	<div class="sidebar">
		this is the sidebar
		<button @click="()=>{DeckStore.loadDeck()}">
			load
		</button>
		<button @click="backToDeck">
			deck
		</button>
	</div>
	<div class="main">
		<div class="deck">
			this will probably go v-for
			{{ DeckStore.deckStore.reactiveState }}
		</div>
	</div>
	<XCommon/>
</div>
</template>

<script lang="ts" setup>
import * as DeckStore from './deck/deck-store';
import XCommon from './_common_/common.vue';
import { unisonReload } from '@/scripts/unison-reload';

console.log('starting TweetDeck UI...');
console.log(DeckStore.deckStore);
// console.log(await DeckStore.getProfiles());
// window.document.documentElement.removeAttribute('style');

if (DeckStore.deckStore.state.profile !== 'td-deck') {
	DeckStore.deckStore.set('profile', 'td-deck');
	unisonReload();
}
DeckStore.loadDeck();

</script>

<script lang="ts">
import { miLocalStorage } from '@/local-storage';
function backToDeck() {
	DeckStore.deckStore.set('profile', 'default');
	miLocalStorage.setItem('ui', 'deck');
	unisonReload();
}
</script>

<style scoped>
.sidebar {
	height: 100vh;
	width: 50px;
	background-color: red;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	margin-right: 10px;
}
.main {
	height: 100%;
	margin-left: 60px;
}
.deck {
	height: 100vh;

}

</style>
