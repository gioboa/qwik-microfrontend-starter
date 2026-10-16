import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';

const CHUNK = /^\/([\w-]+)\/build\/(q-[\w-]+\.js)$/;
// Relative imports would resolve against the host URL and mix module instances.
const RELATIVE_IMPORT = /(?:from|import)\s*\(?\s*["'`]\.\.?\//;

/**
 * Redirects remote chunks that the host also built (same content-hashed name, e.g. the Qwik core)
 * to the host URL, so the browser downloads them once.
 */
export const shareRemoteChunks = (remoteNames: string[], hostBuildDir: string): Plugin => {
	const shareable = new Map<string, boolean>();
	const isShareable = (fileName: string) => {
		if (!shareable.has(fileName)) {
			const hostFile = join(hostBuildDir, fileName);
			shareable.set(fileName, existsSync(hostFile) && !RELATIVE_IMPORT.test(readFileSync(hostFile, 'utf-8')));
		}
		return shareable.get(fileName)!;
	};

	return {
		name: 'share-remote-chunks',
		configurePreviewServer(server) {
			server.middlewares.use((req, res, next) => {
				const [, remote, fileName] = CHUNK.exec(req.url?.split('?')[0] ?? '') ?? [];
				if (remote && remoteNames.includes(remote) && isShareable(fileName)) {
					res.statusCode = 301;
					res.setHeader('Location', `/build/${fileName}`);
					// content-hashed names never change content
					res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
					res.end();
					return;
				}
				next();
			});
		},
	};
};
