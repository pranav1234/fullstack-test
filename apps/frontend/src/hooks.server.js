export const handle = async ({ event, resolve }) => {
	// Get the token from cookies
	const token = event.cookies.get('token');

	// Add token to all fetch requests
	if (token) {
		event.fetch = async (input, init = {}) => {
			return fetch(input, {
				...init,
				headers: {
					...init.headers,
					Authorization: `Bearer ${token}`
				}
			});
		};
	}
	console.log(event.url.pathname, 'event.url.pathname');
	// Protected routes - redirect to login if no token
	if (!token && /^\/articles\/[^/]+$/.test(event.url.pathname)) {
		return new Response(null, {
			status: 303,
			headers: { Location: '/login' }
		});
	}

	return await resolve(event);
};
