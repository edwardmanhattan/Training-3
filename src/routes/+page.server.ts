import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const result = await fetch(env.BASE_URL + `/trending/movie/day?language=en-US`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TOKEN}`
			}
		}).then((r) => r.json());

		if (result.success === false) {
			throw Error(result.status_message);
		} else {
			return { movies: result };
		}
	} catch (err) {
		if (err instanceof Error) console.error(err.message);
	}
};
