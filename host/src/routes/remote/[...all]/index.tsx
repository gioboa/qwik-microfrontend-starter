import type { RequestHandler } from '@builder.io/qwik-city';
import { remotes } from '~/routes';
import { fixRemotePathsInDevMode } from '~/shared';

export const onRequest: RequestHandler = async ({ send, url, request }) => {
  const remoteName = 'remote';
  const pathName = url.pathname.replace(`/${remoteName}/`, '');
  const remoteUrl = remotes[remoteName].url;

  let response = await fetch(remoteUrl + pathName + url.search, {
    credentials: 'same-origin',
    headers: {
      'Content-Type':
        request.headers.get('Content-Type') || 'application/javascript',
      'Access-Control-Allow-Origin': '*',
    },
  });

  if (needNewResponse(remoteUrl + pathName)) {
    let contentType = 'text/html';
    if (isJSorTS(pathName)) {
      contentType = 'application/javascript';
    }

    let content = await response.text();
    content = fixRemotePathsInDevMode(content, remoteName).html;

    response = new Response(content, {
      status: 200,
      headers: { 'Content-Type': contentType },
    });
  }

  send(response);
};

const needNewResponse = (url: string) => isJSorTS(url) || isHtml(url);

const isJSorTS = (url: string) =>
  ['.js', '.ts'].includes(url.slice(-3)) ||
  ['.jsx', '.tsx'].includes(url.slice(-4));

const isHtml = (url: string) => url.slice(-1) === '/';
