# Qwik host and remote

## Getting started

From this directory execute:

```shell
pnpm install
```

```shell
pnpm build.lib
```

```shell
pnpm dev
```

or

```shell
pnpm preview
```

Open your browser at http://localhost:4173/ to see the amazing result

![screenshot](docs/screenshot.png)


## Create a new remote

create a new qwik app under `/apps`
```sh
pnpm create qwik@latest
````

change directory to the new app
```sh
cd myproj
```

edit `package.json`
- change the `name` to your new app name
- remove all `devDependencies` and add the dependencies from the `/packages` instead
```json
	"devDependencies": {
		"@qwik-microfrontend/mfe": "workspace:^1.0.0",
		"@qwik-microfrontend/ui": "workspace:^1.0.0"
	}
```

edit `vite.config.ts` and add `base` path
```ts
export default defineConfig((): UserConfig => {
	return {
		plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
		base: '/myproj/',
```