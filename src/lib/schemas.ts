import { z } from 'zod';

export const registerUserSchema = z.object({
	email: z.string().email('Invalid email address.'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters.')
		.max(64, 'Password must be 64 characters or less.'),
	passwordConfirm: z
		.string()
		.min(6, 'Password must be at least 6 characters.')
		.max(64, 'Password must be 64 characters or less.')
});
