<!-- src/routes/+page.svelte -->
<script>
	let { data } = $props();
</script>

<h1>{data.message}</h1>
