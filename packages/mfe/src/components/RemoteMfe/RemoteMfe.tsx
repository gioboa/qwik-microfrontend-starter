import type { StreamWriter } from '@qwik.dev/core/internal';
import { component$, SSRStream } from '@qwik.dev/core/internal';
import { fixRemotePathsInDevMode } from '../utils';
import type { FetchError, Props } from './RemoteMfe.types';

const handleFetchError = (error: FetchError) => {
	// see https://web.dev/articles/fetch-api-error-handling

	// Failed to fetch
	if (error instanceof TypeError && error.cause.code === 'ECONNREFUSED') {
		console.error('RemoteMfe is not available at address 0:', error.cause.errors[0].address, error.cause.errors[0].port); // IPv6

		if (error.cause.errors[1]) {
			console.error('RemoteMfe is not available at address 1:', error.cause.errors[1].address, error.cause.errors[1].port); // IPv4
		}
	}
};

export default component$(({ remote, removeLoader = true, ...rest }: Props) => {
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
		})
			.then(async (response) => {
				if (response.ok) {
					const reader = response.body!.getReader();
					let fragmentChunk = await reader.read();
					let base = '';
					while (!fragmentChunk.done) {
						const rawHtml = decoder.decode(fragmentChunk.value);
						const fixedHtmlObj = fixRemotePathsInDevMode(rawHtml, base);
						base = fixedHtmlObj.base;
						stream.write(fixedHtmlObj.html);
						fragmentChunk = await reader.read();
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
