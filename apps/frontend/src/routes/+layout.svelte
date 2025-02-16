<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex min-h-screen flex-col">
	<header class="border-b bg-white">
		<nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
			<a href="/" class="text-primary-900 text-xl font-bold">Your App</a>
			<div class="flex items-center gap-6">
				<a href="/articles" class="text-primary-600 hover:text-primary-900"> Articles </a>
				{#if data.user}
					<div class="group relative">
						<form method="POST" action="/logout" class="w-full">
							<button
								type="submit"
								class=" text-primary-600 hover:text-primary-900 flex cursor-pointer items-center gap-2"
							>
								<span>Logout</span>
							</button>
						</form>
					</div>
				{:else}
					<a href="/login" class="text-primary-600 hover:text-primary-900 px-4 py-2"> Login </a>
				{/if}
			</div>
		</nav>
	</header>

	<main class="flex-1">
		<slot />
	</main>
</div>
