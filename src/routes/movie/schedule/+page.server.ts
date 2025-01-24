import type { PageServerLoad } from './$types';
import { getDatesByDayIndonesian } from './dates';

export const load: PageServerLoad = async ({ fetch }) => {
	const base_dates = getDatesByDayIndonesian(2025, 1);

	return { base_dates };
};
