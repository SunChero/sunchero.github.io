// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// @ts-ignore
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
//import starlightThemeSix from '@six-tech/starlight-theme-six'
 import starlightThemeNova from 'starlight-theme-nova'
// import pagePlugin from "@pelagornis/page";
// https://astro.build/config
export default defineConfig({
	image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
	site: 'https://hanifi.ca',
	integrations: [
		starlight({
			
			title: 'Docs',
			logo: {
				src: './src/assets/logo.png',
		},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{ label: 'Getting Started', slug: 'guides/start' },				
				{
					label: 'Cheatsheets',
					autogenerate: { directory: 'cheatsheets' },
				},
				
				{
					label: 'Vuln Base',
					autogenerate: { directory: 'cve' },
				},
				{
					label: 'Tools',
					autogenerate: { directory: 'tools' },
				},
				
				{
					label: 'Commands',
					autogenerate: { directory: 'commands' },
				}
			],
			 plugins: [
			// starlightThemeSix({
			// 			navLinks: [{ // optional
			// 				label: 'Docs',
			// 				link: '/getting-started',
			// 			}],
			// 			footerText: 'Built & designed by [{{-_-}}](https://hanifi.ca).',
						
			// 		}),
			 //pagePlugin()
			 starlightThemeNova(/* options */), 
			],
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			],	
		}),
		svelte(),
	],
	vite: {
		// @ts-ignore
		plugins: [tailwindcss()],
	},
});
