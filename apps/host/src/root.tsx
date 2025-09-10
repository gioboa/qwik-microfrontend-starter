import { PrefetchGraph, PrefetchServiceWorker, component$ } from '@qwik.dev/core';
import { QwikRouterProvider, RouterOutlet } from '@qwik.dev/router';
import { RouterHead } from './components/router-head/router-head';

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
			<head>
				<meta charSet="utf-8" />
				<link rel="manifest" href="/manifest.json" />
				<RouterHead />
			</head>
			<body lang="en">
				<RouterOutlet />
				<PrefetchGraph />
				<PrefetchServiceWorker />
			</body>
		</QwikRouterProvider>
	);
});
