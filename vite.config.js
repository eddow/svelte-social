import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

export default defineConfig({
	server: {
		https: {
            key: readFileSync(`${__dirname}/certs/local.dev-key.pem`),
            cert: readFileSync(`${__dirname}/certs/local.dev.pem`)
		},
		host: 'local.dev',
		proxy: {},
	},
	plugins: [sveltekit()]
});
