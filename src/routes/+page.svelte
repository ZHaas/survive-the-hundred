<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import StatsLayout from '../components/StatsLayout.svelte';
	import InventoryLayout from '../components/InventoryLayout.svelte';
	import MonsterLayout from '../components/MonsterLayout.svelte';
	import PlayerLayout from '../components/PlayerLayout.svelte';
	import { playerHealth } from '$lib/Stores/gameStats.js';
	let show = false;
	let purchasedCombatValue: number | undefined = undefined;
	let totalGold: number | undefined = 100;
	let healthPots: number | undefined = undefined;

	console.log('player health value:', $playerHealth);

	onMount(() => {
		show = true;
	});
</script>

<div class="h-screen w-screen overflow-hidden bg-cyan-950">
	<div class="flex h-full flex-col items-center overflow-hidden">
		{#if show}
			<div class="mt-10">
				<h1
					class="metal-mania text-8xl text-orange-200"
					in:fly={{ x: -window.innerWidth, duration: 700 }}
					style="position: relative; z-index: 2;"
				>
					Survive
				</h1>
				<h1
					class="metal-mania text-8xl text-orange-200"
					in:fly={{ x: window.innerWidth, duration: 700, delay: 200 }}
					style="margin-left: 4rem; position: relative; left: 1.5rem; z-index: 1;"
				>
					The Hundred
				</h1>
			</div>
		{/if}

		<!-- add combat layout component here -->
		<div class="mt-10 flex gap-10">
			<StatsLayout attackValue={purchasedCombatValue ?? 0} healthValue={$playerHealth} />
			<InventoryLayout totalGold={totalGold ?? 0} healthPots={healthPots ?? 0} />
		</div>

		<div class="mt-10 flex h-screen w-full flex-row items-start justify-center gap-12 bg-cyan-950">
			<PlayerLayout />
			<MonsterLayout />
		</div>
	</div>
</div>
