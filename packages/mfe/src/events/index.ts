export const dispatchEvent = (event: string, qty: number | string) => {
	document.dispatchEvent(
		new CustomEvent(event, {
			detail: { qty },
		}),
	);
};
