<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Welcome to our new app!</h1>
		{#if data.session}
			You are logged in as {data.session.user.email}
		{/if}
	</div>
</div>
