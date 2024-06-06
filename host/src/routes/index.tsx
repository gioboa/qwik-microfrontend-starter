import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import RemoteMfe from '~/components/RemoteMfe';

export interface RemoteData {
	name: string;
	url: string;
}

export const remotes: Record<string, RemoteData> = {
	mfe1: { name: 'mfe1', url: 'http://localhost:4174/mfe1/' },
};

export default component$(() => {
	const counterSig = useSignal(0);
	return (
		<>
			<h1>HOST 👋</h1>
			<button
				onClick$={() => {
					counterSig.value++;
				}}
			>
				Counter: {counterSig.value}
			</button>

			<RemoteMfe remote={remotes.mfe1} removeLoader={true} />
		</>
	);
});

export const head: DocumentHead = {
	title: 'Welcome to Qwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};
