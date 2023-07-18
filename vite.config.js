import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

export default defineConfig({
	server: {
		https: {
            key: readFileSync(`${__dirname}/certs/localhost-key.pem`),
            cert: readFileSync(`${__dirname}/certs/localhost.pem`)
		},
		proxy: {},
	},
	plugins: [sveltekit()]
});
