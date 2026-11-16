import type { Monster } from '$lib/Models/MonsterModel.js';

const COMBAT_MESSAGE_DURATION_MS = 800;

export const gameState = $state({
	player: {
		health: 100,
		maxHealth: 100,
		attack: 1,
		defense: 1,
		magicPower: 1,
		magicDefense: 1
	},
	monster: null as Monster | null,
	combatMessages: {
		player: { text: '', id: 0 },
		monster: { text: '', id: 0 }
	},
	turnInProgress: false,
	inventory: {
		gold: 100,
		healthPotions: 1
	},
	monsterDefeated: false,
	numberOfMonstersDefeated: 0
});

export function rollD10() {
	return Math.floor(Math.random() * 11);
}

export function damagePlayer(amount: number) {
	gameState.player.health = Math.max(0, gameState.player.health - amount);
}

export function calculateAttackPlayerDamage(): string {
	const rollD10Result = rollD10();
	const { player, monster } = gameState;
	if (!monster) return '';
	if (rollD10Result === 0) return 'Monster missed!';

	const damage = Math.round(monster.attack * (rollD10Result * 1.1) - player.defense);
	if (damage <= 0) return 'Blocked!';

	damagePlayer(damage);
	return `Monster hits you for ${damage} damage!`;
}

export function attackMonster(amount: number): void {
	const monster = gameState.monster;
	if (!monster) return;

	monster.health = Math.max(0, monster.health - amount);
	if (monster.health === 0) {
		showCombatMessage('monster', 'Monster defeated!');
		showCombatMessage('player', 'You defeated the monster!');
		gameState.monsterDefeated = true;
		gameState.numberOfMonstersDefeated += 1;
		return;
	}

	scheduleMonsterAttack(monster);
}

function scheduleMonsterAttack(monster: Monster) {
	gameState.turnInProgress = true;
	setTimeout(() => {
		if (gameState.monster !== monster || monster.health === 0) {
			gameState.turnInProgress = false;
			return;
		}

		const message = calculateAttackPlayerDamage();
		if (message) showCombatMessage('monster', message);
		setTimeout(() => {
			gameState.turnInProgress = false;
		}, COMBAT_MESSAGE_DURATION_MS);
	}, COMBAT_MESSAGE_DURATION_MS);
}

function showCombatMessage(target: 'player' | 'monster', text: string) {
	const message = gameState.combatMessages[target];
	message.text = text;
	message.id += 1;
}

export function calculateAttackMonsterDamage() {
	const rollD10Result = rollD10();
	const { player, monster } = gameState;
	if (!monster || gameState.turnInProgress) return;

	if (rollD10Result === 0) {
		showCombatMessage('player', 'Miss!');
		scheduleMonsterAttack(monster);
		return;
	}

	const damage = Math.round(player.attack * (rollD10Result * 1.1) - monster.defense);
	if (damage <= 0) {
		showCombatMessage('player', 'Blocked!');
		scheduleMonsterAttack(monster);
		return;
	}

	showCombatMessage('player', `You hit for ${damage} damage!`);
	attackMonster(damage);
}

export function useHealthPotion() {
	const { player, inventory } = gameState;

	if (gameState.turnInProgress || player.health >= player.maxHealth || inventory.healthPotions <= 0)
		return;

	player.health = Math.min(player.maxHealth, player.health + 25);
	inventory.healthPotions -= 1;
}
