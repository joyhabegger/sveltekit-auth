import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { passwordChangeSchema } from '$lib/schemas';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}
	return {
		form: await superValidate(passwordChangeSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, passwordChangeSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, 'passwordConfirm', 'Passwords do not match.');
		}

		const { error: passwordError } = await event.locals.supabase.auth.updateUser({
			password: form.data.password
		});

		if (passwordError) {
			return setError(form, '', 'Error updating your password');
		}
		return {
			form
		};
	}
};
