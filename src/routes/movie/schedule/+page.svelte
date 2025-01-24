<script lang="ts">
	const { data } = $props();

	$inspect(data.base_dates);
</script>

<section class="">
	<div class="grid grid-cols-7 text-xs">
		{#each data.base_dates as [day, dates]}
			<div>
				<div class="border p-2">
					{day}
				</div>

				{#each dates as date}
					<div class="border p-2">
						{date.day}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</section>
