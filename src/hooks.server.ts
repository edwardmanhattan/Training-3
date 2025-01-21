// import { redirect } from '@sveltejs/kit';

// export const handle = async ({ event, resolve }) => {
// 	const auth = event.cookies.get('auth') ? JSON.parse(event.cookies.get('auth') as string) : false;

// 	if (auth) {
// 		// JIKA AUTH ADA DI COOKIES
// 		event.locals.token = auth.accessToken;

// 		if (event.url.pathname === '/login') redirect(303, '/');
// 	} else {
// 		if (event.url.pathname !== '/login') redirect(308, '/login');
// 	}

// 	const response = await resolve(event);
// 	return response;
// };
