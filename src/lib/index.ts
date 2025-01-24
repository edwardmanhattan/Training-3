import { goto } from '$app/navigation';
import { page } from '$app/state';

export function mutateQueryParams(param: string, callback: (args: string) => string) {
	const searchParams = new URLSearchParams(page.url.searchParams);
	const value = searchParams.get(param) ?? '';

	const new_value = callback(value);
	searchParams.set(param, new_value);

	goto(`?${searchParams.toString()}`);

	return new_value;
}
