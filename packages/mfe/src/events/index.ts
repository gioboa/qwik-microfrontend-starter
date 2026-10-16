/**
 * Cross-app events, dispatched on `document` and listened with `useOnDocument`.
 * The leading `-` keeps the event name casing in Qwik's `q-d:` attribute encoding.
 */
export const MFE_EVENTS = {
	APP_VALUE_CHANGED: '-APP_VALUE_CHANGED_EVENT',
} as const;

export type MfeEvent = (typeof MFE_EVENTS)[keyof typeof MFE_EVENTS];

export const dispatchEvent = (event: MfeEvent, qty: number | string) => {
	document.dispatchEvent(
		new CustomEvent(event, {
			detail: { qty },
		}),
	);
};
