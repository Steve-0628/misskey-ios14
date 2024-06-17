<template>
<div class="wrapper">
	<TDSidebar class="sidebar"/>
	<div class="main">
		<template v-for="column in DeckStore.deckStore.reactiveState.columns.value">
			<TDTimeline v-if="column.type === 'tl'" :key="'timeline-' + column.id" class="deck" :column="column">
			</TDTimeline>
			<TDNotifications v-else-if="column.type === 'notifications'" :key="'notification-' + column.id" class="deck" :column="column"></TDNotifications>
			<TDWidgets v-else-if="column.type === 'widgets'" :key="'widgets-' + column.id" class="deck" :column="column"></TDWidgets>
			<TDFakeChannel v-else-if="column.type === 'channel'" :key="'fakechannel-' + column.id" class="deck"></TDFakeChannel>
			<div v-else :key="'other-' + column.id" class="deck">
				{{ column }}
			</div>
		</template>
	</div>
	<XCommon/>
</div>
</template>

<script lang="ts" setup>
import * as DeckStore from './deck/deck-store';
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
	overflow-x: scroll;
}

</style>
