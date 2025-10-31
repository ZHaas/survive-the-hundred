<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { gameStats } from '$lib/Stores/gameStats.js';

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
			<span class=" mb-5 text-5xl text-orange-200">Player Name</span>
			<div class=" flex gap-6">
				<button
					class="rounded-lg border-2 border-orange-200 bg-transparent px-6 py-1 text-2xl font-bold text-orange-200 transition hover:bg-orange-200 hover:text-cyan-950"
					on:click={() => {
						gameStats.playerHealth.update((health) => health - 10);
					}}
				>
					Attack!
				</button>
				<button
					class="flex flex-col items-center rounded-lg border-2 border-orange-200 bg-transparent px-6 py-1 text-2xl font-bold text-orange-200 transition hover:bg-orange-200 hover:text-cyan-950"
				>
					Use Health
					<span>Potion</span>
				</button>
			</div>
			<img src={'MonsterImages/1-RandomHero.png'} alt={'Random Hero'} class="mt-5 max-h-96" />
		</span>
	{/if}
</div>
