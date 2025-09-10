import { component$ } from '@qwik.dev/core';
import type { CounterProps } from './Counter.types';

export default component$(({ label, onClick$, state }: CounterProps) => {
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
				state.increment();
				if (onClick$) {
					onClick$();
				}
			}}
		>
			{label} {state.counter}
		</button>
	);
});
