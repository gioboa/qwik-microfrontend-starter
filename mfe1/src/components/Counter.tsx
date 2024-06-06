import { component$, useSignal } from '@builder.io/qwik';

export const Counter = component$(() => {
	const counterSig = useSignal(0);
	return (
		<button
			onClick$={() => {
				counterSig.value++;
			}}
		>
			Counter: {counterSig.value}
		</button>
	);
});
