import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch, url }) => {
	const page = url.searchParams.get('page') || '1';
	const limit = '10'; // itemsPerPage

	try {
		const response = await fetch(`http://localhost:4000/articles?page=${page}&limit=${limit}`);

		const result = await response.json();

		if (!response.ok) {
			return {
				articles: [],
				pagination: {
					currentPage: 1,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: Number(limit)
				},
				error: result.message || 'Failed to load articles'
			};
		}

		return {
			articles: result.data.articles,
			pagination: result.data.pagination
		};
	} catch (error) {
		return {
			articles: [],
			pagination: {
				currentPage: 1,
				totalPages: 0,
				totalItems: 0,
				itemsPerPage: Number(limit)
			},
			error: 'Failed to fetch articles'
		};
	}
};
