<template>
<div :class="$style.root" :style="bg">
	<img v-if="faviconUrl" :class="$style.icon" :src="faviconUrl"/>
	<div :class="$style.name">{{ instance.name }}</div>
</div>
</template>

<script lang="ts" setup>
import { } from 'vue';
import { instanceName } from '@/config';
import { instance as Instance } from '@/instance';
import { getProxiedImageUrlNullable } from '@/scripts/media-proxy';

const props = defineProps<{
	instance?: {
		faviconUrl?: string
		name: string
		themeColor?: string
	}
}>();

// if no instance data is given, this is for the local instance
const instance = props.instance ?? {
	name: instanceName,
	themeColor: (document.querySelector('meta[name="theme-color-orig"]') as HTMLMetaElement).content,
};

const faviconUrl = $computed(() => props.instance ? getProxiedImageUrlNullable(props.instance.faviconUrl, 'preview') : getProxiedImageUrlNullable(Instance.iconUrl, 'preview') ?? getProxiedImageUrlNullable(Instance.faviconUrl, 'preview') ?? '/favicon.ico');

const themeColor = instance.themeColor ?? '#777777';

const bg = {
	background: `linear-gradient(90deg, ${themeColor}, ${themeColor}00)`,
};
</script>

<style lang="scss" module>
$height: 2ex;

.root {
	// display: flex;
	// align-items: center;
	// height: $height;
	// border-radius: 4px 0 0 4px;
	// overflow: clip;
	color: #fff;
	display: block;
  mask-image: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 100%;
  border-radius: unset;
  overflow: hidden;
}

.icon {
	// height: $height;
	// flex-shrink: 0;
	width: 100%;
  height: auto;
}

.name {
	// margin-left: 4px;
	line-height: 1;
	font-size: 0.9em;
	font-weight: bold;
	// white-space: nowrap;
	// overflow: visible;
	display: inline-block;
  height: calc(100% - 14px);
  line-height: 14px;
  margin-left: 0;
  writing-mode: vertical-lr;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
