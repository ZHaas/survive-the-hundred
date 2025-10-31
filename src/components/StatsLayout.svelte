<script lang="ts">
	import Swords from 'lucide-svelte/icons/Swords';
	import ShieldPlus from 'lucide-svelte/icons/Shield-Plus';
	import HeartPulse from 'lucide-svelte/icons/Heart-Pulse';
	import Sparkles from 'lucide-svelte/icons/Sparkles';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let attackValue: number = 0;
	export let defenseValue: number = 0;
	export let healthValue: number = 100;
	export let magicAttackValue: number = 0;
	export let magicDefenseValue: number = 0;
	export let isMonster: boolean = false;

	let show = false;

	onMount(() => {
		show = true;
	});
</script>

<div class="metal-mania flex items-center justify-center rounded-lg border-2 border-orange-200 p-4">
	{#if show}
		<span in:fly={{ y: -60, duration: 400, delay: 20 }} class="flex items-center">
			<HeartPulse size={36} class="text-orange-200" />
			<span class="ml-3 text-4xl text-orange-200">= {healthValue}</span>
		</span>
		{#if !isMonster}
			<span in:fly={{ y: -60, duration: 400, delay: 120 }} class="ml-6 flex items-center">
				<Swords size={36} class="text-orange-200" />
				<span class="ml-3 text-4xl text-orange-200">= {attackValue}</span>
			</span>
			<span in:fly={{ y: -60, duration: 400, delay: 240 }} class="ml-6 flex items-center">
				<ShieldPlus size={36} class="text-orange-200" />
				<span class="ml-3 text-4xl text-orange-200">= {defenseValue}</span>
			</span>
			<span in:fly={{ y: -60, duration: 400, delay: 360 }} class="ml-6 flex items-center">
				<Sparkles size={36} class="text-orange-200" />
				<span class="ml-3 text-4xl text-orange-200">= {magicAttackValue}</span>
			</span>
			<span in:fly={{ y: -60, duration: 400, delay: 480 }} class="ml-6 flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="36"
					height="36"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#fed7aa"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-sparkles-icon lucide-sparkles"
				>
					<path
						d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
					/>
					<path d="M20 3v4" />
					<path d="M22 5h-4" />
					<path d="M4 17v2" />
					<path d="M5 18H3" />
					<line
						x1="3"
						y1="3"
						x2="21"
						y2="21"
						stroke="#fed7aa"
						stroke-width="2.5"
						stroke-linecap="round"
					/>
				</svg>
				<span class="ml-3 text-4xl text-orange-200">= {magicDefenseValue}</span>
			</span>{/if}{/if}
</div>
