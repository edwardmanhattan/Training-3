import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { getCurrentDate, getDatesByDayIndonesian } from './dates';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const currentDate = getCurrentDate();

	const date = Number(url.searchParams.get('date')) || currentDate.date;
	const month = Number(url.searchParams.get('month')) || currentDate.month;
	const year = Number(url.searchParams.get('year')) || currentDate.year;

	const movies = await fetch(env.BASE_URL + `/trending/movie/week?language=en-US`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${env.TOKEN}`
		}
	}).then((r) => r.json());

	const base_dates = getDatesByDayIndonesian(year, month + 1);

	const movie_results = movies.results.map((v) => {
		return {
			id: v.id,
			title: v.title,
			release_date: v.release_date
		};
	});

	base_dates.forEach((week) => {
		week.forEach(
			(date: {
				day: number;
				month: number;
				year: number;
				fullDate: string;
				movie: Record<string, unknown>;
			}) => {
				movie_results.forEach((movie: Record<string, unknown>) => {
					if (movie.release_date === date.fullDate) date.movie = movie;
				});
			}
		);
	});

	return { date, month, year, base_dates, movies };
};
