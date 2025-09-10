import { PrefetchGraph, component$ } from '@qwik.dev/core';
import { QwikRouterProvider, RouterOutlet } from '@qwik.dev/router';

import './global.css';

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	return (
		<QwikRouterProvider>
			<RouterOutlet />
			<PrefetchGraph base="/remote/build/" />
		</QwikRouterProvider>
	);
});
