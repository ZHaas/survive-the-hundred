<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Gem from 'lucide-svelte/icons/Gem';
	import FlaskCanonical from 'lucide-svelte/icons/flask-conical';
	export let totalGold: number = 0;
	export let healthPots: number = 0;

	let show = false;

	onMount(() => {
		show = true;
	});
</script>

<div class="metal-mania flex items-center justify-center rounded-lg border-2 border-orange-200 p-4">
	{#if show}
		<span in:fly={{ y: -60, duration: 400, delay: 20 }} class="flex items-center">
			<Gem size={36} class="text-orange-200" />
			<span class="ml-3 text-4xl text-orange-200">= {totalGold}</span>
		</span>
		<span in:fly={{ y: -60, duration: 400, delay: 120 }} class="ml-6 flex items-center">
			<FlaskCanonical size={36} class="text-orange-200" />
			<span class="ml-3 text-4xl text-orange-200">= {healthPots}</span>
		</span>
	{/if}
</div>
