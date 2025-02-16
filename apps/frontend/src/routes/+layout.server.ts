import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	const userDataCookie = cookies.get('user');

	if (!token || !userDataCookie) {
		return {
			user: null
		};
	}

	try {
		const user = JSON.parse(userDataCookie);
		return {
			user
		};
	} catch (error) {
		// If there's an error parsing the user data, clear the cookies
		cookies.delete('token', { path: '/' });
		cookies.delete('user', { path: '/' });
		return {
			user: null
		};
	}
};
