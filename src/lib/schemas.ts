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

export const loginUserSchema = z.object({
	email: z.string().email('Invalid email address.'),
	password: z.string().min(6, 'Password must be at least 6 characters.')
});

export const emailChangeSchema = z.object({
	email: z.string().email('Invalid email address.')
});

export const passwordChangeSchema = z.object({
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters.')
		.max(64, 'Password must be 64 characters or less.'),
	passwordConfirm: z
		.string()
		.min(6, 'Password must be at least 6 characters.')
		.max(64, 'Password must be 64 characters or less.')
});
