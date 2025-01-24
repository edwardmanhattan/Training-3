<script lang="ts">
	import { env } from '$env/dynamic/public';

	const { data } = $props();

	interface ISeat {
		id: string;
		status: 'selected' | 'occupied' | 'empty' | 'hidden';
	}

	const config = $state({
		rows: 12,
		cols: 14
	});

	const _seats = $derived.by(() => {
		const rows: ISeat[][] = [];

		for (let i = 0; i < config.rows; i++) {
			const cols: ISeat[] = [];

			for (let j = 0; j < config.cols; j++) {
				const seat: ISeat = {
					id: String.fromCharCode(i + 65) + (j + 1).toString(),
					status: 'empty'
				};

				cols.push(seat);
			}

			rows.push(cols);
		}

		return rows;
	});

	const __seats = $state(_seats);

	$inspect(data);
</script>

<div class="gridco flex h-screen w-screen">
	<div class="block w-1/4">
		<img src="{env.PUBLIC_IMAGE_URL}/w500{data.movie.poster_path}" alt="Poster" />
	</div>

	<div class="grow p-4">
		<h1>Pilih Kursi</h1>

		<input type="number" bind:value={config.rows} />
		<input type="number" bind:value={config.cols} />

		<button
			onclick={() => {
				__seats?.forEach((seat) => {
					seat.forEach((s) => {
						if (s.status === 'selected') s.status = 'occupied';
					});
				});
			}}
		>
			Save Seats
		</button>

		{#each __seats ?? [] as seat, i}
			<div class="mb-2 flex items-center gap-2">
				{#each seat as s, j}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="h-12 w-12 rounded bg-slate-200 hover:scale-105 hover:cursor-pointer"
						class:bg-emerald-600={s.status === 'selected'}
						class:bg-rose-600={s.status === 'occupied'}
						class:hidden={s.status === 'hidden'}
						onclick={() => {
							if (s.status === 'empty') {
								s.status = 'selected';
							}
						}}
					>
						{s.id}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
