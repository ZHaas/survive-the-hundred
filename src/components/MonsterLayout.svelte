<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { MonsterGenerator } from '$lib/Monsters/MonsterGenerator.js';
	import { gameState } from '$lib/Stores/gameStats.svelte.js';
	import StatsLayout from './StatsLayout.svelte';

	const today = new Date();
	const monsterOrder = MonsterGenerator(today);

	let show = $state(false);

	onMount(() => {
		gameState.monster = monsterOrder[0] ?? null;
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
			{#if gameState.monster}
				<span class=" mb-5 text-5xl text-orange-200">{gameState.monster.name}</span>
				<StatsLayout isMonster={true} />
				<div class="relative mt-5 inline-block overflow-hidden rounded-lg">
					<img
						src={gameState.monster.imageUrl}
						alt={gameState.monster.name}
						class="block max-h-96"
					/>
					{#if gameState.combatMessages.monster.text}
						{#key gameState.combatMessages.monster.id}
							<span
								class="combat-message-overlay"
								role="status"
								aria-live="polite"
								aria-atomic="true"
							>
								{gameState.combatMessages.monster.text}
							</span>
						{/key}
					{/if}
				</div>
			{:else}
				<span class="text-2xl text-orange-200">No monster found</span>
			{/if}
		</span>
	{/if}
</div>
