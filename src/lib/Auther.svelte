<svelte:head>
	<script>
		// Object.fromEntries is not supported by Safari
		opener.postMessage(Object.assign({}, ...Array.from(
			window.location.search
				.slice(1)
				.split("&")
				.map((param) => param.split("=").map(decodeURIComponent))
			, ([k, v]) => ({[k]: v}))), location.origin);
	</script>
</svelte:head>
Closing...