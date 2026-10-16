import type { StreamWriter } from '@qwik.dev/core/internal';
import { component$, SSRRaw, SSRStream } from '@qwik.dev/core/internal';
import type { FetchError, Props } from './RemoteMfe.types';

const handleFetchError = (error: FetchError) => {
	// see https://web.dev/articles/fetch-api-error-handling

	if (error instanceof DOMException && error.name === 'TimeoutError') {
		console.error('RemoteMfe did not respond in time:', error.message);
	} else if (error instanceof TypeError && error.cause?.code === 'ECONNREFUSED') {
		// single address -> plain error, multiple addresses (IPv6 + IPv4) -> AggregateError with `errors`
		const errors = error.cause.errors ?? [error.cause];
		errors.forEach((e, i) => console.error(`RemoteMfe is not available at address ${i}:`, e.address, e.port));
	} else {
		console.error('RemoteMfe fetch failed:', error);
	}
};

export default component$(({ remote, removeLoader = true, timeout = 5000, ...rest }: Props) => {
	const url = remote.url;
	const decoder = new TextDecoder();
	const getSSRStreamFunction = (remoteUrl: string) => async (stream: StreamWriter) => {
		const _remoteUrl = new URL(remoteUrl);
		if (removeLoader) {
			_remoteUrl.searchParams.append('loader', 'false');
		}

		await fetch(_remoteUrl, {
			headers: {
				accept: 'text/html',
			},
			// a hanging remote must not block the host SSR forever
			signal: AbortSignal.timeout(timeout),
		})
			.then(async (response) => {
				if (response.ok) {
					const reader = response.body!.getReader();
					let fragmentChunk = await reader.read();
					while (!fragmentChunk.done) {
						// `stream: true` keeps multi-byte characters split across chunks intact
						const html = decoder.decode(fragmentChunk.value, { stream: true });
						stream.write((<SSRRaw data={html} />) as string);
						fragmentChunk = await reader.read();
					}
					const tail = decoder.decode();
					if (tail) {
						stream.write((<SSRRaw data={tail} />) as string);
					}
				} else {
					console.error('Failed to connect to RemoteMfe with status:', response.status, response.statusText);
				}
			})
			.catch(handleFetchError);
	};

	return (
		<div {...rest} q:shadowRoot>
			<template shadowRootMode="open">
				<SSRStream>{getSSRStreamFunction(url)}</SSRStream>
			</template>
		</div>
	);
});
