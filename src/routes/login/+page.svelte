<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let loading = $state(false);
</script>

<div class="grid h-screen place-items-center">
	<div class="mx-auto w-1/4 rounded border p-4 shadow">
		<h1 class="text-center text-lg font-bold">Masuk Dong!</h1>

		<br />

		<form
			action="?/login"
			method="POST"
			use:enhance={() => {
				loading = true;

				return async ({ result }) => {
					if (result.type === 'success') {
						alert('BERHASIL WOI');
						goto('/');
					} else if (result.type === 'failure') alert('GAGAL. SALAH USERNAME / PASSWORD');

					loading = false;
				};
			}}
		>
			<input type="text" name="username" id="username" placeholder="username" />
			<input type="password" name="password" id="password" placeholder="password" />

			<button type="submit">
				{#if loading === true}
					... loading
				{:else}
					Login
				{/if}
			</button>
		</form>
	</div>
</div>
