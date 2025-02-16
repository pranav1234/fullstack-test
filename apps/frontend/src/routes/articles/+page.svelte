<script lang="ts">
	let { data } = $props();
	let selectedChannel = $state('');
	let selectedAnalyst = $state('');
	const itemsPerPage = data.pagination.itemsPerPage;
	const currentPage = data.pagination.currentPage;
	const totalPages = data.pagination.totalPages;
	const totalItems = data.pagination.totalItems;

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
	const filteredArticles = $derived(
		data.articles.filter((article: Article) => {
			const matchChannel = !selectedChannel || article.channel?.name === selectedChannel;
			const matchAnalyst =
				!selectedAnalyst ||
				article.analysts?.some(
					(analyst) => `${analyst.firstName} ${analyst.lastName}` === selectedAnalyst
				);
			return matchChannel && matchAnalyst;
		})
	);

	// Reset filters
	function resetFilters() {
		selectedChannel = '';
		selectedAnalyst = '';
		goToPage(1);
	}

	function goToPage(page: number) {
		const url = new URL(window.location.href);
		url.searchParams.set('page', page.toString());
		window.history.pushState({}, '', url.toString());
		window.location.reload();
	}

	function handleReadMore(e: Event) {
		if (!data.user) {
			e.preventDefault();
			alert('Please log in to read the full article');
		}
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

		{#if filteredArticles.length === 0}
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

							<div class="mt-4 flex items-center justify-end">
								<a
									href="/articles/{article.slug}"
									class="text-primary-600 hover:text-primary-900 inline-flex items-center text-sm font-medium"
									on:click={handleReadMore}
								>
									Read more →
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<!-- Pagination Controls -->
			{#if totalPages > 1}
				<div class="mt-8 flex justify-center gap-2">
					<button
						class="rounded-md px-3 py-2 text-sm font-medium transition-colors
							{currentPage === 1
							? 'cursor-not-allowed bg-blue-100 text-blue-400'
							: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
						disabled={currentPage === 1}
						on:click={() => goToPage(currentPage - 1)}
					>
						Previous
					</button>

					{#each Array(totalPages) as _, i}
						<button
							class="rounded-md px-3 py-2 text-sm font-medium transition-colors
								{currentPage === i + 1 ? 'bg-blue-900 text-white' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
							on:click={() => goToPage(i + 1)}
						>
							{i + 1}
						</button>
					{/each}

					<button
						class="rounded-md px-3 py-2 text-sm font-medium transition-colors
							{currentPage === totalPages
							? 'cursor-not-allowed bg-blue-100 text-blue-400'
							: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
						disabled={currentPage === totalPages}
						on:click={() => goToPage(currentPage + 1)}
					>
						Next
					</button>
				</div>

				<div class="mt-4 text-center text-sm text-blue-600">
					Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(
						currentPage * itemsPerPage,
						totalItems
					)} of {totalItems} articles
				</div>
			{/if}
		{/if}
	</div>
</div>
