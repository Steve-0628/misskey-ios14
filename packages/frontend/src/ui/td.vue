<template>
<div class="wrapper">
	<TDSidebar class="sidebar"/>
	<div class="main">
		<template v-for="(column, index) in DeckStore.deckStore.reactiveState.columns.value">
			<TDTimeline v-if="column.type === 'tl'" :key="'timeline-' + column.id" class="deck" :column="column" :index="index" :kbs="ckss"/>
			<TDNotifications v-else-if="column.type === 'notifications'" :key="'notification-' + column.id" class="deck" :column="column" :index="index" :kbs="ckss"/>
			<TDWidgets v-else-if="column.type === 'widgets'" :key="'widgets-' + column.id" class="deck" :column="column" :index="index" :kbs="ckss"/>
			<TDFakeChannel v-else-if="column.type === 'channel'" :key="'fakechannel-' + column.id" class="deck" :index="index" :kbs="ckss"/>
			<TDDeckSimple v-else :key="'other-' + column.id" class="deck" :index="index" :kbs="ckss">
				<template #header>
					Error: Unknown column
				</template>
				<template #default>
					{{ column }}
				</template>
			</TDDeckSimple>
		</template>
	</div>
	<XCommon/>
</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import * as DeckStore from './deck/deck-store';
import TDDeckSimple from './td/deck.simple.vue';
import TDSidebar from './td/sidebar.vue';
import TDTimeline from './td/timeline.vue';
import TDNotifications from './td/notifications.vue';
import TDWidgets from './td/widgets.vue';
import TDFakeChannel from './td/fakechannel.vue';
import XCommon from './_common_/common.vue';
import { unisonReload } from '@/scripts/unison-reload';

if (DeckStore.deckStore.state.profile !== 'td-deck') {
	DeckStore.deckStore.set('profile', 'td-deck');
	unisonReload();
}
DeckStore.loadDeck();

const ckss = reactive({ // CurrentKeyboardSelectionState
	selectedColumn: -1,
	selectedRow: -1,
});

function hotkeyHandler(key: KeyboardEvent): void {
	if (document.activeElement) {
		if (['input', 'textarea'].some(el => document.activeElement && document.activeElement.matches(el))) return;
		if (document.activeElement.attributes['contenteditable']) return;
	}

	switch (key.code) {
		case 'KeyJ':
			// down
			if (ckss.selectedColumn === -1) {
				return;
			} else {
				ckss.selectedRow++;
			}
			break;
		case 'KeyK':
			// up
			if (ckss.selectedColumn === -1) {
				return;
			} else if (ckss.selectedRow === -1) {
				ckss.selectedRow = 0;
			} else if (ckss.selectedRow > 0) {
				ckss.selectedRow--;
			}
			break;
		case 'KeyH':
			// left
			if (ckss.selectedColumn <= 0) { // -1 or 0
				ckss.selectedColumn = 0;
			} else {
				ckss.selectedColumn--;
			}
			break;
		case 'KeyL':
			// right
			if (ckss.selectedColumn === -1) {
				ckss.selectedColumn = Math.min(DeckStore.deckStore.reactiveState.columns.value.length - 1, 1);
			} else if (ckss.selectedColumn >= DeckStore.deckStore.reactiveState.columns.value.length - 1) {
				return;
			} else {
				ckss.selectedColumn++;
			}
			break;

		case 'Digit1':
			if (DeckStore.deckStore.reactiveState.columns.value.length > 0) {
				ckss.selectedColumn = 0;
				ckss.selectedRow = 0;
			}
			break;
		case 'Digit2':
			if (DeckStore.deckStore.reactiveState.columns.value.length > 1) {
				ckss.selectedColumn = 1;
				ckss.selectedRow = 0;
			}
			break;
		case 'Digit3':
			if (DeckStore.deckStore.reactiveState.columns.value.length > 2) {
				ckss.selectedColumn = 2;
				ckss.selectedRow = 0;
			}
			break;
		case 'Digit4':
			if (DeckStore.deckStore.reactiveState.columns.value.length > 3) {
				ckss.selectedColumn = 3;
				ckss.selectedRow = 0;
			}
			break;

		case 'Digit0':
			ckss.selectedColumn = DeckStore.deckStore.reactiveState.columns.value.length - 1;
			ckss.selectedRow = 0;
			break;

		case 'Escape':
			ckss.selectedColumn = -1;
			ckss.selectedRow = -1;
			break;

		default:
			console.log(key);
			break;
	}
}

document.addEventListener('keydown', hotkeyHandler);

</script>

<style>
html, body, #misskey_app {
	height: 100%!important;
}
</style>

<style scoped>
.wrapper {
	height: 100%;
}
.sidebar {
	height: 100vh;
	width: 60px;
	background-color: red;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
}
.main {
	height: 100%;
	margin-left: 60px;
	display: flex;
}
.deck {
	height: 100%;
	min-width: 310px;
	max-width: 310px;
	overflow-x: scroll;
}

</style>
