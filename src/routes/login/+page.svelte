<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form, errors, enhance, reset } = superForm(data.form);
	function resetForm() {
		reset({ data: { email: '', password: '' } });
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center px-10">
	<form method="post" use:enhance novalidate>
		<h2 class="h2 mb-6">Log in to our new app!</h2>
		<label class="label mt-8" for="email">
			<span class="font-bold">Email</span>
			<input class="input" type="email" name="email" id="email" bind:value={$form.email} />
			{#if $errors.email}
				<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
			{/if}
		</label>
		<label class="label mt-8" for="password">
			<div class="flex justify-between items-center">
				<span class="font-bold">Password</span>
				<a
					href="/resetPassword"
					class="text-blue-700 dark:text-blue-500 hover:underline font-light font-xs mr-2"
					>Forgot password?</a
				>
			</div>
			<input
				class="input"
				type="password"
				name="password"
				id="password"
				bind:value={$form.password}
			/>
			{#if $errors.password}
				<span class="block text-red-600 dark:text-red-500">{$errors.password}</span>
			{/if}
		</label>
		<button type="submit" class="btn variant-filled mt-8">Log in</button>
		<button type="reset" on:click={resetForm} class="btn variant-filled-error mt-8">Reset</button>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
			Don't have an account? <a
				href="/register"
				class="text-blue-700 hover:underline dark:text-blue-500">Sign up</a
			>
		</div>
	</form>
</div>
