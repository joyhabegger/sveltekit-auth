<script lang="ts">
	import type { PageData } from './$types';
	import { Lock, Mail } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const {
		form: emailForm,
		errors: emailError,
		enhance: emailEnhance
	} = superForm(data.emailForm, {
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					const toastSuccess: ToastSettings = {
						message:
							'Success! Your email has been updated. Confirm your email change from both email accounts.',
						background: 'variant-filled-primary'
					};
					toastStore.trigger(toastSuccess);
					break;
				case 'error':
					const toastError: ToastSettings = {
						message: 'An error occurred in updating your email!',
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
	const { form, errors, enhance } = superForm(data.passwordForm, {
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

<div class="py-20">
	<!-- Account Page Header -->
	<div class="mx-auto flex max-w-2xl flex-col items-center pb-8 text-center">
		<span class="mt-2 text-5xl font-bold">Account Settings</span>
		<span class="text-neutral-content mt-4 text-center text-lg leading-8">
			Manage your email and password.
		</span>
	</div>
	<div class=" mx-auto max-w-xl space-y-8 divide-y dark:divide-gray-700">
		<section class="px-6 pt-8">
			<div class="flex items-center font-semibold">
				<Mail size={18} />
				<span class="ml-4 text-2xl">Email Address</span>
			</div>
			<p class="mt-3 max-w-none text-sm">
				Change the email associated with your account: <strong>{data.session?.user.email}</strong>
			</p>
			<!-- Email Address Form -->
			<form method="POST" action="?/updateEmail" use:emailEnhance class="mt-4">
				<label for="email" class="label mt-4">
					<span class="font-bold">New Email</span>
					<input class="input" type="email" name="email" id="email" bind:value={$emailForm.email} />
					{#if $emailError.email}
						<span class="block text-red-600 dark:text-red-500">{$emailError.email}</span>
					{/if}
				</label>
				<button type="submit" class="btn variant-filled mt-4">Update email</button>
			</form>
		</section>

		<section class="px-6 pt-8">
			<div class="flex items-center font-semibold">
				<Lock size={18} />
				<span class="ml-4 text-2xl">Password</span>
			</div>
			<p class="mt-3 max-w-none text-sm">Change the password associated with your account</p>
			<!-- Change Password Form -->
			<form method="POST" action="?/updatePassword" use:enhance class="mt-4">
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
				<button type="submit" class="btn variant-filled mt-4">Change password</button>
			</form>
		</section>
	</div>
</div>
