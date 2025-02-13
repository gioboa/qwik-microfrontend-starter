interface RemoteData {
	name: string;
	url: string;
}

export interface Props {
	remote: RemoteData;
	removeLoader?: boolean;
	token?: string;
}

type ErrorCause = {
	address: string;
	port: string;
};

// any other fix for TS2339?
export type FetchError = Error & {
	cause: {
		errors: ErrorCause[];
		code: string;
	}
};
