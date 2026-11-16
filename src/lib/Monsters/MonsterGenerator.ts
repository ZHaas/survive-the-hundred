import type { Monster } from '$lib/Models/MonsterModel.js';
import { monsterTiers } from './monsterList.js';

// Simple seeded random generator
function mulberry32(seed: number) {
	let t = (seed += 0x6d2b79f5);
	return function () {
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function MonsterGenerator(date: Date): Monster[] {
	const seed =
		date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
	const rand = mulberry32(seed);

	const tierOne = monsterTiers.find((t) => t.tier === 1)?.monsters ?? [];
	const tierTwo = monsterTiers.find((t) => t.tier === 2)?.monsters ?? [];

	// Shuffle function using seeded random
	function shuffle<T>(arr: T[]): T[] {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(rand() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	const shuffledTierOne = shuffle(tierOne);
	const shuffledTierTwo = shuffle(tierTwo);

	// First 10 monsters: tier one
	let order: Monster[] = shuffledTierOne.slice(0, 10);

	// Next monsters: tier one (buffed) + tier two
	const buffedTierOne = shuffledTierOne.map((m) => ({
		...m,
		attack: Math.round(m.attack * 1.2),
		defense: Math.round(m.defense * 1.2),
		health: Math.round(m.health * 1.2)
	}));

	order = order.concat(shuffle([...buffedTierOne, ...shuffledTierTwo]));

	return order;
}
