<script lang="ts">
	import type { PageData } from './$types';
	import { Lock, Mail } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					const toastSuccess: ToastSettings = {
						message: 'Success! Your password has been updated.',
						background: 'variant-filled-primary'
					};
					toastStore.trigger(toastSuccess);
					break;
				case 'error':
					const toastError: ToastSettings = {
						message: 'An error occurred in updating your password!',
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
</script>

<div class="container h-full mx-auto flex justify-center items-center px-10">
	<!-- Change Password Form -->
	<form method="POST" use:enhance class="mt-4" novalidate>
		<h2 class="h2 mb-6">Reset your password!</h2>
		<label for="password" class="label mt-4">
			<span class="font-bold">New Password</span>
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
		<label for="passwordConfirm" class="label mt-4">
			<span class="font-bold">Confirm New Password</span>
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
		<button type="submit" class="btn variant-filled mt-4">Reset password</button>
	</form>
</div>
