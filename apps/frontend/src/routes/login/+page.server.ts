import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, {
				error: 'Email and password are required',
				email: email as string
			});
		}

		try {
			const response = await fetch('http://localhost:4000/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const result = await response.json();

			if (!response.ok) {
				return fail(400, {
					error: result.message || 'Login failed',
					email: email as string
				});
			}

			if (!result.data?.token) {
				return fail(400, {
					error: 'No token received from server',
					email: email as string
				});
			}

			cookies.set('token', result.data.token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production'
			});
		} catch (err) {
			console.error('Login error:', err);
			return fail(500, {
				error: err instanceof Error ? err.message : 'Internal server error',
				email: email as string
			});
		}

		// Redirect outside of try/catch
		throw redirect(303, '/');
	}
} satisfies Actions;
