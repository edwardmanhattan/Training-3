import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {};

export const actions: Actions = {
	login: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username');
		const password = formData.get('password');

		try {
			const result = await fetch(env.BASE_URL + `/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: username,
					password: password,
					expiresInMins: '30'
				}),
				credentials: 'include'
			});

			const result_json = await result.json();

			if (result_json.message) {
				// KALAU USERNAME PASSWORD SALAH, KITA AKAN DAPAT .message
				return fail(401, { message: result_json.message });
			} else {
				// KALAU TIDAK DAPAT .message, berarti benar

				cookies.set('auth', JSON.stringify(result_json), {
					maxAge: 60 * 60 * 24,
					sameSite: 'strict',
					path: '/',
					secure: false,
					httpOnly: false
				});

				return { result_json };
			}
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}
	},

	register: async () => {
		console.log('REGISTER BELOM JALAN!');
	}
};
