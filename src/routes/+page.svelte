<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import StatsLayout from '../components/StatsLayout.svelte';
	import InventoryLayout from '../components/InventoryLayout.svelte';
	import MonsterLayout from '../components/MonsterLayout.svelte';
	import PlayerLayout from '../components/PlayerLayout.svelte';
	import MusicPlayer from '../components/MusicPlayer.svelte';
	import { heroes } from '../lib/data/heroes.js';
	import { gameState } from '$lib/Stores/gameStats.svelte.js';

	let show = $state(false);
	//let purchasedCombatValue: number | undefined = undefined;
	let characterImage = $state<string | undefined>(undefined);

	let showDefeatedMonsterModal = $derived(gameState.monsterDefeated);

	onMount(() => {
		show = true;
	});
</script>

{console.log('What is showDefeatedMonsterModal?', showDefeatedMonsterModal)}
{#if showDefeatedMonsterModal}
	<modal class="bg-opacity-10 fixed inset-0 flex items-center justify-center bg-black">
		<div class="rounded-lg bg-white p-8">
			<h2 class="text-2xl font-bold">Monster Defeated!</h2>
			<p>You have defeated the monster.</p>
		</div>
	</modal>
{/if}

<div class="h-screen w-screen overflow-hidden bg-cyan-950">
	<MusicPlayer />
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
		{#if characterImage === undefined}
			<!-- Character image not set -->
			<div class="flex flex-wrap gap-4">
				{#each heroes as hero (hero.id)}
					<button
						type="button"
						class="animated-border hero-select mt-5 cursor-pointer"
						aria-label={`Select ${hero.name}`}
						onclick={() => (characterImage = hero.image)}
					>
						<img src={hero.image} alt="" class="max-h-96" />
					</button>
				{/each}
			</div>
			<h3 class="metal-mania mt-8 text-4xl text-orange-200">Select your Hero</h3>
		{/if}

		{#if characterImage !== undefined}
			<!-- add combat layout component here -->
			<div class="mt-10 flex gap-10">
				<StatsLayout />
				<InventoryLayout />
			</div>

			<div
				class="mt-10 flex h-screen w-full flex-row items-start justify-center gap-12 bg-cyan-950"
			>
				<PlayerLayout {characterImage} />
				<MonsterLayout />
			</div>
		{/if}
	</div>
</div>

<style>
	.hero-select {
		overflow: hidden;
		border-radius: 1rem;
		padding: 3px;
	}

	.hero-select img {
		position: relative;
		z-index: 1;
		display: block;
		border-radius: calc(1rem - 3px);
	}
</style>
