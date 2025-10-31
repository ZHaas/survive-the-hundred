<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { monsterTiers } from '$lib/Monsters/monsterList.js';
	import { MonsterGenerator } from '$lib/Monsters/MonsterGenerator.js';
	import StatsLayout from './StatsLayout.svelte';

	const today = new Date();
	const monsterOrder = MonsterGenerator(today);

	// Example: show the first monster
	let currentMonster = monsterOrder[0];

	console.log('what is currentMonster', currentMonster);

	const tierOne = monsterTiers.find((t) => t.tier === 1);
	const monster = currentMonster;

	let show = false;

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
			{#if monster}
				<span class=" mb-5 text-5xl text-orange-200">{monster.name}</span>
				<StatsLayout healthValue={monster.health} isMonster={true} />
				<img src={monster.imageUrl} alt={monster.name} class="mt-5 max-h-96" />
			{:else}
				<span class="text-2xl text-orange-200">No monster found</span>
			{/if}
		</span>
	{/if}
</div>
