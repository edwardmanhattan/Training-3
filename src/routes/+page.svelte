<script>
	import { env } from '$env/dynamic/public';

	const { data } = $props();

	$inspect(data);
</script>

<div class="grid grid-cols-6 gap-4">
	{#each data.movies.results as movie}
		<a href="/movie/{movie.id}" class="rounded border p-2 hover:cursor-pointer hover:brightness-75">
			<img src={env.PUBLIC_IMAGE_URL + '/w780' + movie.poster_path} alt="Poster" />
			<h1 class="my-1 text-center font-semibold">{movie.title}</h1>
			<p class="line-clamp-3">{movie.overview}</p>
		</a>
	{/each}
</div>
