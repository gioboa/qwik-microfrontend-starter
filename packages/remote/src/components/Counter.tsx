import { $, component$, useSignal } from '@builder.io/qwik';

export const Counter = component$(() => {
	const counterSig = useSignal(0);
	const addCart = $(() => {
    document.dispatchEvent(
      new CustomEvent('APP_VALUE_CHANGED_EVENT', {
        detail: { qty: 50 },
      })
    );
  });

	return (
		<button
			style={{
				border: '0 solid #e2e8f0',
				marginTop: '10px',
				backgroundColor: 'rgb(246, 179, 82)',
				borderRadius: '.25rem',
				fontWeight: '700',
				padding: '.5rem 1rem .5rem 1rem',
				color: 'rgb(24, 24, 24)',
			}}
			onClick$={() => {
				counterSig.value++;
				addCart();
			}}
		>
			Remote counter: {counterSig.value}
		</button>
	);
});
