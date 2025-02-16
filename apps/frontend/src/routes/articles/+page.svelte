<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="bg-primary-50 min-h-screen p-6">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-primary-900 text-3xl font-bold">Articles</h1>
			<a
				href="/articles/new"
				class="bg-primary-900 hover:bg-primary-800 rounded-md px-4 py-2 text-white transition-colors"
			>
				New Article
			</a>
		</div>

		{#if data.error}
			<div class="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
				{data.error}
			</div>
		{/if}

		{#if data.articles.length === 0}
			<div class="rounded-lg bg-white p-6 text-center shadow">
				<p class="text-primary-600">No articles found</p>
			</div>
		{:else}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.articles as article}
					<article
						class="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
					>
						{#if article.image}
							<img src={article.image} alt={article.title} class="h-48 w-full object-cover" />
						{/if}
						<div class="p-6">
							<h2 class="text-primary-900 mb-2 text-xl font-semibold">
								{article.title}
							</h2>
							<p class="text-primary-600 mb-4 line-clamp-2">
								{article.description}
							</p>
							<div class="flex items-center justify-between">
								<span class="text-primary-500 text-sm">
									{new Date(article.createdAt).toLocaleDateString()}
								</span>
								<a
									href={`/articles/${article.slug}`}
									class="text-primary-900 hover:text-primary-700"
								>
									Read more →
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</div>
