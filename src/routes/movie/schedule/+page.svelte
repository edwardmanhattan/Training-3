<script lang="ts">
	const { data } = $props();

	$inspect(data.base_dates);
</script>

<div class="grid grid-cols-7">
	{#each data.base_dates as [day, dates]}
		<div class="border">
			{day}
		</div>
	{/each}
</div>
