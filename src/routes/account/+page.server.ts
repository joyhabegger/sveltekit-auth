import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { emailChangeSchema, passwordChangeSchema } from '$lib/schemas';
import { handleLoginRedirect } from '$lib/helpers';

export const load: PageServerLoad = async (event) => {
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

		const { error: emailError } = await event.locals.supabase.auth.updateUser({
			email: emailForm.data.email
		});

		if (emailError) {
			return setError(emailForm, 'email', 'Error updating your email.');
		}

		return {
			emailForm
		};
	},
	updatePassword: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const passwordForm = await superValidate(event, passwordChangeSchema);

		if (!passwordForm.valid) {
			return fail(400, {
				passwordForm
			});
		}

		if (passwordForm.data.password !== passwordForm.data.passwordConfirm) {
			return setError(passwordForm, 'passwordConfirm', 'Passwords do not match.');
		}

		const { error: passwordError } = await event.locals.supabase.auth.updateUser({
			password: passwordForm.data.password
		});

		if (passwordError) {
			return setError(passwordForm, '', 'Error updating your password');
		}
		return {
			passwordForm
		};
	}
};
