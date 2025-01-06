/**
 * Gulp tasks
 */

import * as fs from 'node:fs';
import gulp from 'gulp';
import locales from './locales/index.js';
import meta from './package.json' assert { type: "json" };

gulp.task('copy:frontend:fonts', () =>
	gulp.src('./packages/frontend/node_modules/three/examples/fonts/**/*').pipe(gulp.dest('./built/_frontend_dist_/fonts/'))
);

gulp.task('copy:frontend:tabler-icons', () =>
	gulp.src('./packages/frontend/node_modules/@tabler/icons-webfont/**/*').pipe(gulp.dest('./built/_frontend_dist_/tabler-icons/'))
);

gulp.task('copy:frontend:locales', cb => {
	fs.mkdirSync('./built/_frontend_dist_/locales', { recursive: true });

	const v = { '_version_': meta.version };

	for (const [lang, locale] of Object.entries(locales)) {
		fs.writeFileSync(`./built/_frontend_dist_/locales/${lang}.${meta.version}.json`, JSON.stringify({ ...locale, ...v }), 'utf-8');
	}

	cb();
});

gulp.task('build', gulp.parallel(
	'copy:frontend:locales', 'copy:frontend:fonts', 'copy:frontend:tabler-icons'
));

gulp.task('default', gulp.task('build'));

gulp.task('watch', () => {
	gulp.watch([
		'./packages/*/src/**/*',
	], { ignoreInitial: false }, gulp.task('build'));
});
