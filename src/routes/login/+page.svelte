<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form);
</script>

<div class="container h-full mx-auto flex justify-center items-center px-10">
	<form method="post" use:enhance>
		<h2 class="h2 mb-6">Log in to our new app!</h2>
		<label class="label mt-8" for="email">
			<span class="font-bold">Email</span>
			<input class="input" type="email" name="email" bind:value={$form.email} />
			{#if $errors.email}
				<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
			{/if}
		</label>
		<label class="label mt-8" for="password">
			<span class="font-bold">Password</span>
			<input class="input" type="password" name="password" bind:value={$form.password} />
			{#if $errors.password}
				<span class="block text-red-600 dark:text-red-500">{$errors.password}</span>
			{/if}
		</label>
		<button type="submit" class="btn variant-filled mt-8">Log in</button>
	</form>
</div>
