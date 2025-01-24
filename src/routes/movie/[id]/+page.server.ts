import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const movie_id = params.id;

	try {
		const result = await fetch(env.BASE_URL + `/movie/${movie_id}?language=en-US`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TOKEN}`
			}
		}).then((r) => r.json());

		interface ISeat {
			id: string;
			status: 'selected' | 'occupied' | 'empty' | 'hidden';
		}

		const config = {
			rows: 12,
			cols: 14
		};

		const seats = () => {
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
		};

		if (result.success === false) {
			throw Error(result.status_message);
		} else {
			return { movie: result, seats: seats() };
		}
	} catch (err) {
		if (err instanceof Error) console.error(err.message);
	}
};
