<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import {
		calculateAttackMonsterDamage,
		gameState,
		useHealthPotion
	} from '$lib/Stores/gameStats.svelte.js';

	let { characterImage }: { characterImage?: string } = $props();
	let show = $state(false);

	onMount(() => {
		show = true;
	});
</script>

<div
	class="metal-mania flex min-h-[600px] w-[400px] flex-col items-center justify-center rounded-lg border-2 border-orange-200 p-6"
>
	{#if show}
		<span
			in:fly={{ y: -60, duration: 400, delay: 20 }}
			class="mx-auto flex flex-col items-center justify-center"
		>
			<span class=" mb-5 text-5xl text-orange-200">Player Name</span>
			<div class=" flex gap-6">
				<button
					class="animated-border rounded-lg border-2 border-orange-200 bg-transparent px-6 py-1 text-2xl font-bold text-orange-200 transition hover:bg-orange-200 hover:text-cyan-950 disabled:cursor-not-allowed disabled:opacity-60"
					onclick={calculateAttackMonsterDamage}
					disabled={gameState.turnInProgress}
				>
					Attack!
				</button>
				<button
					class="flex flex-col items-center rounded-lg border-2 border-orange-200 px-6 py-1 text-2xl font-bold transition
					{gameState.turnInProgress ||
					gameState.player.health >= gameState.player.maxHealth ||
					gameState.inventory.healthPotions <= 0
						? 'cursor-not-allowed bg-gray-400 text-gray-600 opacity-60'
						: 'bg-transparent text-orange-200 hover:bg-orange-200 hover:text-cyan-950'}"
					onclick={useHealthPotion}
					disabled={gameState.turnInProgress ||
						gameState.player.health >= gameState.player.maxHealth ||
						gameState.inventory.healthPotions <= 0}
				>
					Use Health
					<span>Potion</span>
				</button>
			</div>
			{#if characterImage}
				<div class="relative mt-5 inline-block overflow-hidden rounded-lg">
					<img src={characterImage} alt="Selected hero" class="block max-h-96" />
					{#if gameState.combatMessages.player.text}
						{#key gameState.combatMessages.player.id}
							<span
								class="combat-message-overlay"
								role="status"
								aria-live="polite"
								aria-atomic="true"
							>
								{gameState.combatMessages.player.text}
							</span>
						{/key}
					{/if}
				</div>
			{/if}
		</span>
	{/if}
</div>
