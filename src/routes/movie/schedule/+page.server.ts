import type { PageServerLoad } from './$types';
import { getDatesByDayIndonesian } from './dates';

export const load: PageServerLoad = async ({ fetch }) => {
	const base_dates = getDatesByDayIndonesian();

	return { base_dates };
};
