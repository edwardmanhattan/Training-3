<script lang="ts">
	import { page } from '$app/state';
	import { mutateQueryParams } from '$lib';
	import { monthNames } from './dates';

	const { data } = $props();

	$inspect(data.base_dates);
</script>

<div class="flex items-center gap-2 p-4">
	<button
		class="w-fit border-0"
		onclick={() => {
			if (data.month - 1 < 1) {
				page.url.searchParams.set('year', (data.year - 1).toString());
				mutateQueryParams('month', () => '12');
			} else mutateQueryParams('month', (v) => (Number(v) - 1).toString());
		}}
	>
		&triangleleft;
	</button>

	<button
		class="w-fit border-0"
		onclick={() => {
			if (data.month + 1 > 12) {
				page.url.searchParams.set('year', (data.year + 1).toString());
				mutateQueryParams('month', () => '1');
			} else mutateQueryParams('month', (v) => (Number(v) + 1).toString());
		}}
	>
		&triangleright;
	</button>

	<div>{monthNames[data.month - 1]}</div>
	<div>{data.year}</div>
</div>

<section class="">
	<div class="grid grid-cols-7 text-xs">
		{#each data.base_dates as [day, dates]}
			<div class="border-x">
				<div class="px-2 py-1 text-center">
					{day}
				</div>

				{#each dates as date}
					<div class="h-32 border-b p-2 text-center">
						<p>{date.fullDate}</p>

						{#if date.movie}
							<a href="/movie/{date.movie.id}" class="my-1 w-full rounded bg-stone-400 p-1">
								{date.movie.title}
							</a>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</section>
