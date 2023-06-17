<script lang="ts">
	import type { PageData } from './$types';
	import { Lock, Mail } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form: emailForm, errors: emailError, enhance: emailEnhance } = superForm(data.emailForm);
	const { form, errors, enhance } = superForm(data.passwordForm, {
		resetForm: true
	});
</script>

<div class="py-20">
	<!-- Account Page Header -->
	<div class="mx-auto flex max-w-2xl flex-col items-center pb-8 text-center">
		<span class="mt-2 text-5xl font-bold">Account Settings</span>
		<span class="text-neutral-content mt-4 text-center text-lg leading-8">
			Manage your email, password, and other account details.
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
