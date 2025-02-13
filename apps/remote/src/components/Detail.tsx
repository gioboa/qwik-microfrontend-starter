import { component$, useVisibleTask$ } from '@builder.io/qwik';

export const Detail = component$(() => {
	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(() => {
		console.log('mounted');
	});
	return <span style={{ marginLeft: '8px' }}>I'm a detail</span>;
});
