<script lang="ts">
	let tracks = [
		{ label: 'Survive The Hundred', src: '/Music/Survive1.mp3', type: 'audio/mpeg' },
		{ label: 'Survive The Hundred ... Again', src: '/Music/Survive2.wav', type: 'audio/wav' },
		{ label: 'Surviving The Hundred', src: '/Music/Survive3.mp3', type: 'audio/mpeg' },
		{ label: 'Survive Kind of Day', src: '/Music/Survive5.mp3', type: 'audio/mpeg' },
		{ label: 'Survive You Tomorrow', src: '/Music/Survive4.mp3', type: 'audio/mpeg' }
	];
	let selectedTrack = tracks[0];
	let isMuted = false;
	let audioEl: HTMLAudioElement;
	let needsUserPlay = true;

	function handleTrackChange(event: Event) {
		const idx = +(event.target as HTMLSelectElement).value;
		selectedTrack = tracks[idx];
		audioEl.load();
		audioEl.play();
		needsUserPlay = audioEl.paused;
	}

	function toggleMute() {
		isMuted = !isMuted;
		audioEl.muted = isMuted;
	}

	function tryAutoplay() {
		if (audioEl) {
			audioEl
				.play()
				.then(() => {
					needsUserPlay = false;
				})
				.catch(() => {
					needsUserPlay = true;
				});
		}
	}

	// Try to autoplay on mount, but show button if blocked
	import { onMount } from 'svelte';
	onMount(() => {
		tryAutoplay();
	});
</script>

<div class="music-controls m-10 flex items-center justify-end gap-4">
	<select
		onchange={handleTrackChange}
		class="custom-select cursor-pointer rounded-lg border-2 border-orange-200 bg-transparent px-4 py-1 text-2xl font-bold text-orange-200 transition hover:bg-orange-200 hover:text-cyan-950 focus:ring-2 focus:ring-orange-300 focus:outline-none"
	>
		{#each tracks as track, i (track.label)}
			<option value={i} selected={track === selectedTrack}>{track.label}</option>
		{/each}
	</select>
	<button
		onclick={toggleMute}
		class="rounded bg-orange-200 px-3 py-1 font-bold text-cyan-950 hover:bg-orange-300"
	>
		{isMuted ? 'Unmute' : 'Mute'}
	</button>
	{#if needsUserPlay}
		<button
			onclick={tryAutoplay}
			class="animate-pulse rounded bg-orange-200 px-3 py-1 font-bold text-cyan-950 hover:bg-orange-300"
		>
			▶ Play Music
		</button>
	{/if}
</div>

<audio bind:this={audioEl} autoplay loop>
	<source src={selectedTrack.src} type={selectedTrack.type} />
	Your browser does not support the audio element.
</audio>

<style>
	.custom-select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' fill='%23fed7aa' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 12l8 8 8-8'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1.25rem center;
		background-size: 1.5em 1.5em;
		padding-right: 2.5em;
	}
	.custom-select:hover {
		background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' fill='%23083344' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 12l8 8 8-8'/%3E%3C/svg%3E");
	}
</style>
