<script lang="ts">
	import { page } from '$app/state';
	import { debounce, mutateQueryParams } from '$lib';

	let keyword = $state('');

	const update = debounce(() => {
		mutateQueryParams('keyword', () => keyword);
	}, 1000);

	$effect(() => update(keyword));
</script>

<!-- svelte-ignore a11y_autofocus -->
<input
	type="text"
	bind:value={keyword}
	onkeyup={(e) => {
		if (e.key === 'Enter') mutateQueryParams('keyword', () => keyword);
	}}
	autofocus
/>
