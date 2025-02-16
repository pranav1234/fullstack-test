<script lang="ts">
	import { page } from '$app/stores';

	let { data } = $props();

	const { article } = data;
</script>

<!-- Template with TyeScript checking -->

<div class="bg-primary-50 min-h-screen py-8">
	<article class="mx-auto max-w-4xl px-4">
		<div class="mb-8">
			<a
				href="/articles"
				class="text-primary-600 hover:text-primary-900 inline-flex items-center gap-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
						clip-rule="evenodd"
					/>
				</svg>
				Back to Articles
			</a>
		</div>

		<div class="overflow-hidden rounded-lg bg-white shadow-lg">
			{#if article.image}
				<div class="relative h-96 w-full">
					<img src={article.image} alt={article.title} class="h-full w-full object-cover" />
				</div>
			{/if}

			<div class="p-8">
				<div class="mb-6">
					<h1 class="text-primary-900 mb-4 text-4xl font-bold">
						{article.title}
					</h1>
					<div class="text-primary-600 flex items-center gap-4">
						<span class="text-sm">
							{new Date(article.publishedAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</span>
						{#if article.author}
							<span class="text-sm">
								By {article.author.name}
							</span>
						{/if}
					</div>
				</div>

				<div class="prose prose-primary max-w-none">
					<p class="text-primary-800 whitespace-pre-wrap text-lg leading-relaxed">
						{@html article.content}
					</p>
				</div>

				{#if article.tags && article.tags.length > 0}
					<div class="mt-8 border-t pt-6">
						<div class="flex flex-wrap gap-2">
							{#each article.tags as tag}
								<span class="bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
									{tag}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</article>
</div>
