<!-- src/routes/+page.svelte -->
<script>
	let { data } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="space-y-4">
		<div class="bg-primary p-4 text-white">This should be black background</div>
		<div class="text-primary bg-white p-4">This should be black text</div>
		<div class="border-primary border-2 p-4">This should have a black border</div>
	</div>
</div>
