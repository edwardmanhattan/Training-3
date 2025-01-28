<script lang="ts">
	import { page } from '$app/state';
	import { mutateQueryParams } from '$lib';

	interface Props {
		total_content: number;
	}

	const { total_content }: Props = $props();

	let interval = $state<string>(page.url.searchParams.get('limit') || '10');

	const max_page = $derived<number>(Math.ceil(total_content / Number(interval)));
	const page_now = $derived<number>(
		Math.floor(Number(page.url.searchParams.get('offset')) / Number(interval) + 1)
	);
</script>

<div class="my-4 flex items-center gap-4">
	<select
		bind:value={interval}
		onchange={() => {
			mutateQueryParams('limit', () => interval);
		}}
	>
		<option value="10">10</option>
		<option value="15">15</option>
		<option value="20">20</option>
		<option value="25">25</option>
	</select>

	<button
		class="w-16"
		onclick={() => {
			if (page_now === 1)
				mutateQueryParams('offset', () => ((max_page - 1) * Number(interval)).toString());
			else
				mutateQueryParams('offset', () =>
					((page_now - 1) * Number(interval) - Number(interval)).toString()
				);
		}}
	>
		prev
	</button>

	<div>{page_now} / {max_page}</div>

	<button
		class="w-16"
		onclick={() => {
			if (page_now === max_page) mutateQueryParams('offset', () => '0');
			else mutateQueryParams('offset', () => (page_now * Number(interval)).toString());
		}}
	>
		next
	</button>
</div>
