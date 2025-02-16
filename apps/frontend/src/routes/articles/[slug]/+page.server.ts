import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const response = await fetch(`http://localhost:4000/articles/${params.slug}`);

		if (!response.ok) {
			throw error(response.status, 'Article not found');
		}

		const article = await response.json();
		return { article: article.data.article };
	} catch (e) {
		throw error(500, 'Error loading article');
	}
};
