import { browser } from '$app/env';
import { writable } from 'svelte/store';

const key = 'appState';

const state = {
	darkMode: false
};

export const appState = writable(state);

if (browser) {
	appState.set(JSON.parse(localStorage.getItem(key) || '{}') || state);

	appState.subscribe((val) => {
		// When appState is updated, check for darkMode and set the HTML class accordingly
		const root = window.document.getElementsByTagName('html')[0];

		if (val.darkMode && !root.classList.contains('dark')) {
			root.className = 'dark';
		}

		if (!val.darkMode && root.classList.contains('dark')) {
			root.className = '';
		}

		localStorage.setItem(key, JSON.stringify(val));
	});
}
