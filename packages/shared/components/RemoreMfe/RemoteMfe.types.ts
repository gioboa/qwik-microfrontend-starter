export interface RemoteData {
	name: string;
	url: string;
}

export interface Props {
	remote: RemoteData;
	removeLoader?: boolean;
	token?: string;
}
