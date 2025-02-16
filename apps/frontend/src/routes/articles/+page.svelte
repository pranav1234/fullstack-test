<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	let selectedAnalyst = '';
	let selectedChannel = '';

	// Get unique channels and analysts from the articles
	const channels = [...new Set(data.articles.map((article) => article.channel?.name))].filter(
		Boolean
	);
	const analysts = [
		...new Set(
			data.articles.flatMap((article) =>
				article.analysts?.map((analyst) => `${analyst.firstName} ${analyst.lastName}`)
			)
		)
	].filter(Boolean);

	// Filter articles based on selections
	$: filteredArticles = data.articles.filter((article) => {
		const matchChannel = !selectedChannel || article.channel?.name === selectedChannel;
		const matchAnalyst =
			!selectedAnalyst ||
			article.analysts?.some(
				(analyst) => `${analyst.firstName} ${analyst.lastName}` === selectedAnalyst
			);
		return matchChannel && matchAnalyst;
	});

	// Reset filters
	function resetFilters() {
		selectedAnalyst = '';
		selectedChannel = '';
	}
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

		<!-- Filters -->
		<div class="mb-6 rounded-lg bg-white p-4 shadow">
			<div class="flex flex-wrap items-center gap-4">
				<div class="flex items-center gap-2">
					<label for="channel" class="text-primary-700 text-sm font-medium">Channel:</label>
					<select
						id="channel"
						bind:value={selectedChannel}
						class="border-primary-200 text-primary-800 rounded-md border px-3 py-1"
					>
						<option value="">All Channels</option>
						{#each channels as channel}
							<option value={channel}>{channel}</option>
						{/each}
					</select>
				</div>

				<div class="flex items-center gap-2">
					<label for="analyst" class="text-primary-700 text-sm font-medium">Analyst:</label>
					<select
						id="analyst"
						bind:value={selectedAnalyst}
						class="border-primary-200 text-primary-800 rounded-md border px-3 py-1"
					>
						<option value="">All Analysts</option>
						{#each analysts as analyst}
							<option value={analyst}>{analyst}</option>
						{/each}
					</select>
				</div>

				<button on:click={resetFilters} class="text-primary-600 hover:text-primary-900 text-sm">
					Reset Filters
				</button>

				<div class="text-primary-600 ml-auto text-sm">
					{filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'} found
				</div>
			</div>
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
				{#each filteredArticles as article}
					<article
						class="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
					>
						<div class="p-6">
							<div class="mb-4 flex items-center gap-2">
								{#if article.channel?.badge}
									<img
										src={article.channel.badge}
										alt={article.channel.name}
										class="h-6 w-6 rounded-full object-cover"
									/>
								{/if}
								<span class="text-primary-600 text-sm"
									>{article.channel?.name || 'Unknown Channel'}</span
								>
							</div>

							<h2 class="text-primary-900 mb-2 text-xl font-semibold">
								{article.title}
							</h2>

							<p class="text-primary-600 mb-4 line-clamp-2">
								{article.summary}
							</p>

							{#if article.analysts?.length > 0}
								<div class="flex flex-wrap gap-2">
									{#each article.analysts as analyst}
										<div class="flex items-center gap-2">
											{#if analyst.picture}
												<img
													src={analyst.picture}
													alt={`${analyst.firstName} ${analyst.lastName}`}
													class="h-6 w-6 rounded-full object-cover"
												/>
											{/if}
											<span class="text-primary-600 text-sm">
												{analyst.firstName}
												{analyst.lastName}
											</span>
										</div>
									{/each}
								</div>
							{/if}

							<div class="flex items-center justify-end">
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
