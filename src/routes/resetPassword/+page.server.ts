import { setError, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import { resetPasswordSchema } from '$lib/schemas';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}
	return {
		form: await superValidate(resetPasswordSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, resetPasswordSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error: authError } = await event.locals.supabase.auth.resetPasswordForEmail(
			form.data.email,
			{ redirectTo: 'http://localhost:5173/updatePassword' }
		);

		if (authError) {
			if (authError instanceof AuthApiError && authError.status === 400) {
				setError(form, 'email', 'Invalid credentials');
				return fail(400, {
					form
				});
			}
		}

		return { form };
	}
};
