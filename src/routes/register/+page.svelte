<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const { form, errors, enhance, reset } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					const toastSuccess: ToastSettings = {
						message: 'Success! Confirm your email to login.',
						background: 'variant-filled-primary'
					};
					toastStore.trigger(toastSuccess);
					break;
				case 'error':
					const toastError: ToastSettings = {
						message: 'An error occurred in creating your account!',
						background: 'variant-filled-error'
					};
					toastStore.trigger(toastError);
					break;
				default:
					return;
			}
			return;
		}
	});
	function resetForm() {
		reset({ data: { email: '', password: '', passwordConfirm: '' } });
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center px-10">
	<form method="post" use:enhance novalidate>
		<h2 class="h2 mb-6">Sign up for our new app!</h2>
		<label class="label mt-8" for="email">
			<span class="font-bold">Email</span>
			<input class="input" type="email" name="email" id="email" bind:value={$form.email} />
			{#if $errors.email}
				<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
			{/if}
		</label>
		<label class="label mt-8" for="password">
			<span class="font-bold">Password</span>
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
		<label class="label mt-8" for="passwordConfirm">
			<span class="font-bold">Confirm password</span>
			<input
				class="input"
				type="password"
				name="passwordConfirm"
				id="passwordConfirm"
				bind:value={$form.passwordConfirm}
			/>
			{#if $errors.passwordConfirm}
				<span class="block text-red-600 dark:text-red-500">{$errors.passwordConfirm}</span>
			{/if}
		</label>
		<button type="submit" class="btn variant-filled mt-8">Sign up</button>
		<button type="reset" on:click={resetForm} class="btn variant-filled-error mt-8">Reset</button>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
			Already have an account? <a
				href="/login"
				class="text-blue-700 hover:underline dark:text-blue-500">Log in</a
			>
		</div>
	</form>
</div>
