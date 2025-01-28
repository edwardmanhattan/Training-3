import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const keyword = url.searchParams.get('keyword') || '';
	const limit = url.searchParams.get('limit') || 10;
	const offset = url.searchParams.get('offset') || 0;

	try {
		const data_table = await fetch(
			env.BASE_URL_2 + `/master/nakes?keyword=${keyword}&limit=${limit}&offset=${offset}`
		).then((r) => r.json());

		if (data_table.status === 200) {
			return { data_table: data_table.data };
		} else throw Error(data_table.message);
	} catch (err) {
		if (err instanceof Error) {
			console.error('Page Santet Error - ' + err.message);
			error(500, { message: err.message });
		}
	}
};
