<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import StatsLayout from '../components/StatsLayout.svelte';

	let show = false;
	let purchasedCombatValue: number | undefined = undefined;
	let totalGold: number | undefined = undefined;

	onMount(() => {
		show = true;
	});
</script>

<div class="flex h-screen flex-col items-center overflow-hidden bg-cyan-950">
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
	<div class="mt-10">
		<StatsLayout attackValue={purchasedCombatValue ?? 0} />
	</div>
</div>
