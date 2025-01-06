import { vitePluginPugBuild } from './vite-plugin-pug-build.js';
import { vitePluginPugServe } from './vite-plugin-pug-serve.js';
import type { LocalsObject, Options } from 'pug';

type PugSettings = {
  options: Options;
  locals: LocalsObject;
};
const vitePluginPug = (settings?: {
  build?: Partial<PugSettings>;
  serve?: Partial<PugSettings>;
}) => {
	const buildSettings = {
		options: { ...settings?.build?.options },
		locals: { ...settings?.build?.locals },
	};
	const serveSettings = {
		options: { ...settings?.serve?.options },
		locals: { ...settings?.serve?.locals },
	};

	return [
		vitePluginPugBuild({
			options: buildSettings.options,
			locals: buildSettings.locals,
		}),
		vitePluginPugServe({
			options: serveSettings.options,
			locals: serveSettings.locals,
		}),
	];
};

export default vitePluginPug;
