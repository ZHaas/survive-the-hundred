import type { Monster } from '$lib/Models/MonsterModel.js';

export type MonsterTier = {
	tier: number;
	monsters: Monster[];
};

export const monsterTiers: MonsterTier[] = [
	{
		tier: 1,
		monsters: [
			{
				name: 'Fire Slime',
				attack: 2,
				defense: 2,
				ability: 'Burn',
				health: 5,
				imageUrl: '/MonsterImages/1-RedSlime.png',
				magic: 0,
				rewardGold: 0
			},
			{
				name: 'Orange Slime',
				attack: 3,
				defense: 1,
				ability: 'Double Strike',
				health: 4,
				imageUrl: '/MonsterImages/2-OrangeSlime.png',
				magic: 0,
				rewardGold: 0
			}
		]
	},
	{
		tier: 2,
		monsters: [
			{
				name: 'Tank Slime',
				attack: 2,
				defense: 3,
				ability: 'Block',
				health: 10,
				imageUrl: '/MonsterImages/2-PurpleSlime.png',
				magic: 0,
				rewardGold: 0
			}
		]
	}
];
