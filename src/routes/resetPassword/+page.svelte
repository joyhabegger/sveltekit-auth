<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					const toastSuccess: ToastSettings = {
						message: 'Success! Please check your email to reset your password',
						background: 'variant-filled-primary'
					};
					toastStore.trigger(toastSuccess);
					break;
				case 'error':
					const toastError: ToastSettings = {
						message: 'An error occurred in resetting your password!',
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
	<form method="post" use:enhance novalidate>
		<h2 class="h2 mb-6">Reset your password.</h2>
		<label class="label mt-8" for="email">
			<span class="font-bold">Email</span>
			<input class="input" type="email" name="email" id="email" bind:value={$form.email} />
			{#if $errors.email}
				<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
			{/if}
		</label>
		<button type="submit" class="btn variant-filled mt-8">Reset password</button>
	</form>
</div>
