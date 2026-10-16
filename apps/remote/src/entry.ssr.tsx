/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { renderToStream, type RenderToStreamOptions } from '@qwik.dev/core/server';
import Root from './root';

const base = '/remote/build/';

export default function (opts: RenderToStreamOptions) {
	const url = new URL(opts.serverData!.url);
	return renderToStream(<Root />, {
		base,
		...opts,
		// Use container attributes to set attributes on the html tag.
		containerAttributes: {
			lang: 'en-us',
			...opts.containerAttributes,
		},
		containerTagName: 'div',
		// the host already loads the Qwik Loader when embedding the remote (`?loader=false`)
		qwikLoader: url.searchParams.get('loader') ? 'never' : 'module',
	});
}
