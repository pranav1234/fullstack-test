import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
	const token = cookies.get('token');

	if (!token) {
		throw redirect(303, '/login');
	}

	try {
		const response = await fetch(`http://localhost:4000/articles/${params.slug}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		const result = await response.json();
		console.log(result);

		if (!response.ok) {
			throw error(response.status, result.message || 'Failed to load article');
		}

		return {
			article: result.data.article
		};
	} catch (err) {
		console.error('Article fetch error:', err);
		throw error(500, 'Failed to load article');
	}
};
