<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<form method="post" use:enhance>
		<h2 class="h2 mb-6">Sign up for our new app!</h2>
		<label class="label">
			<span>Email</span>
			<input class="input" type="text" name="email" />
		</label>
		<label class="label">
			<span>Password</span>
			<input class="input" type="password" name="password" />
		</label>
		<button type="submit" class="btn variant-filled mt-4">Sign up!</button>
	</form>
</div>
