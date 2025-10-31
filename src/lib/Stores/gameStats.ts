import { writable } from 'svelte/store';

export const playerHealth = writable(100);

export const gameStats = {
	playerHealth
};
