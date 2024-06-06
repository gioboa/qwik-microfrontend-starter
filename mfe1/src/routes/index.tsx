import { component$ } from '@builder.io/qwik';
import { Counter } from '~/components/Counter';

export default component$(() => {
	return (
		<>
			<h1>MFE1 👋</h1>
			<Counter />
		</>
	);
});
