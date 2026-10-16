interface RemoteData {
	name: string;
	url: string;
}

export interface Props {
	remote: RemoteData;
	removeLoader?: boolean;
	/** Max time in ms to wait for the remote html (headers and body). Defaults to 5000 */
	timeout?: number;
	token?: string;
}

type ErrorCause = {
	address: string;
	port: string;
};

// any other fix for TS2339?
export type FetchError = Error & {
	cause?: ErrorCause & {
		errors?: ErrorCause[];
		code: string;
	};
};
