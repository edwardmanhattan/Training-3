<script lang="ts">
	const { data } = $props();

	$inspect(data.base_dates);
</script>

<section class="">
	<div class="grid grid-cols-7 text-xs">
		{#each data.base_dates as [day, dates]}
			<div class="border-x">
				<div class="px-2 py-1 text-center">
					{day}
				</div>

				{#each dates as date}
					<div class="border-b p-2 text-center">
						{date.day}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</section>
