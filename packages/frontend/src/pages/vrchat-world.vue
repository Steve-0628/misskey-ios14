<template>
<MkStickyContainer>
	<MkSpacer :contentMax="700" :marginMin="16" :marginMax="32" :class="$style.container">
		<div v-if="world" class="_gaps_m">
			<a :class="$style.title" class="world" :href="`https://vrchat.com/home/world/${id}`" target="_blank" rel="noopener">{{ world.name }}</a>
			<MkSelect v-model="selectedOption" :onUpdate:modelValue="() => timeKey++">
				<option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
			</MkSelect>
			<div>{{ selectedOptionLabel }}: <MkTime :key="timeKey" :time="world[selectedOption]" mode="absolute"/></div>
			<div class="_gaps_s">
				<div v-if="world.featured">featured</div>
				heat: {{ world.heat }}, popularity: {{ world.popularity }}<br>
				<div v-if="world.namespace">namespace: {{ world.namespace }}</div>
				<div v-if="world.organization !== 'vrchat'">"Org: {{ world.organization }}</div>
				private: {{ world.privateOccupants }}, public: {{ world.publicOccupants }}<br>
				訪問者数: {{ world.visits }}<br>
				Capacity: {{ world.capacity }}
			</div>
			<div :class="[$style.content, $style.instance]">
				<div class="_gaps_s">
					<div v-if="world.tags.length" :class="[$style.container, $style.grid]">
						<div v-for="tag in world.tags" :key="tag" :class="$style.tag">{{ tag }}</div>
					</div>
					{{ world.description }}
				</div>
				<img :class="$style.img" :src="world.imageUrl/*world.thumbnailImageUrl*/" decoding="async"/>
			</div>
			<VrchatUser v-if="author" :id="world.authorId" class="_gaps_m" :user="author"/>
			<MkLoading v-else/>
		</div>
		<MkLoading v-else/>
	</MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue';
import VrchatUser from '@/components/VrcUser.user.vue';
import { User, World, fetchDataWithAuth } from '@/scripts/vrchat-api';
import { definePageMetadata } from '@/scripts/page-metadata';
import MkSelect from '@/components/MkSelect.vue';
import { ArrayElementType } from '@/types/custom-utilities';

const props = defineProps<{
	id: string;
}>();

const world = shallowRef<World>();
const author = shallowRef<User>();

// eslint-disable-next-line vue/no-setup-props-destructure
fetchDataWithAuth('world', { world_id: props.id }).then(async wrld => {
	world.value = wrld;
	if (wrld) author.value = await fetchDataWithAuth('user', { user_id: wrld.authorId });
});

const selectedOption = ref<ArrayElementType<typeof options>['value']>('created_at');
let timeKey = 0;

const options = [
	{ value: 'created_at', label: 'ワールド作成日' },
	{ value: 'labsPublicationDate', label: 'ラボ公開日' },
	{ value: 'publicationDate', label: '公開日' },
	{ value: 'updated_at', label: '最終更新日' },
] as const;

const selectedOptionLabel = computed(() =>
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	options.find(opt => opt.value === selectedOption.value)!.label,
);

definePageMetadata({
	title: 'VRChat World',
	icon: 'ti ti-badge-vr',
});
</script>

<style lang="scss" module>
@container (min-width: 400px) {
	.instance {
		display: grid;
		grid-template-columns: 1fr 1fr;
		.img {
			margin: .5em;
		}
	}
}

.container {
	background: var(--navBg);
	border-radius: 2em;
	padding: 1em;
	a {
		color: var(--link);
	}
}

.title {
	margin-left: .5em;
	font-size: 2em;
	position: relative;
	&:global(.world) {
		background: var(--bg);
		border-radius: 1em;
		padding: .4em
	}
}

.content {
	background: var(--bg);
	border-radius: 1.5em;
	padding: 1em;
}

.img {
	border-radius: 10%;
	width: 100%;
	margin: 1em auto;
}

.tag {
	border: .1em solid var(--bg);
	margin: .1em;
	border-radius: 1em;
	padding: .5em;
}

.grid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}
</style>
