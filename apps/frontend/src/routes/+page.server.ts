// src/routes/+page.server.ts
export async function load({ fetch }: { fetch: typeof window.fetch }) {
	// const res = await fetch('http://localhost:4000/api');
	// const data = await res.json();

	return {
		message: 's'
	};
}
