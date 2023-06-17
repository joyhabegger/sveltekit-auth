import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { emailChangeSchema, passwordChangeSchema } from '$lib/schemas';
import { handleLoginRedirect } from '$lib/helpers';

export const load: PageServerLoad = async (event) => {
	console.log('running load function');
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	return {
		emailForm: await superValidate(emailChangeSchema),
		passwordForm: await superValidate(passwordChangeSchema)
	};
};

export const actions: Actions = {
	updateEmail: async (event) => {
		console.log('Updating email');
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const emailForm = await superValidate(event, emailChangeSchema);

		if (!emailForm.valid) {
			console.log('Invalid email form');
			return fail(400, {
				emailForm
			});
		}

		console.log('Running updateUser for email');
		const { error: emailError } = await event.locals.supabase.auth.updateUser({
			email: emailForm.data.email
		});

		if (emailError) {
			console.log('Error updating your email.');
			return setError(emailForm, 'email', 'Error updating your email.');
		}

		return {
			emailForm
		};
	},
	updatePassword: async (event) => {
		console.log('Updating password');
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const passwordForm = await superValidate(event, passwordChangeSchema);

		if (!passwordForm.valid) {
			console.log('Invalid password form');
			return fail(400, {
				passwordForm
			});
		}

		if (passwordForm.data.password !== passwordForm.data.passwordConfirm) {
			console.log('Passwords do not match.');
			return setError(passwordForm, 'passwordConfirm', 'Passwords do not match.');
		}

		console.log('Running updateUser for password');
		const { error: passwordError } = await event.locals.supabase.auth.updateUser({
			password: passwordForm.data.password
		});

		if (passwordError) {
			console.log('Error updating your password.');
			return setError(passwordForm, '', 'Error updating your password');
		}
		return {
			passwordForm
		};
	}
};
