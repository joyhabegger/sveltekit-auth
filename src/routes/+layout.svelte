<script lang="ts">
	// Dependency: Floating UI
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch, popup } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import { ChevronDown, Settings, LogIn, LogOut, UserCircle2 } from 'lucide-svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button on:click={() => goto('/')} class="btn bg-iniial ml-10 text-2xl font-bold"
					>SvelteKit-Auth-Supabase</button
				>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if session}
					<div class="relative hidden md:block">
						<!-- trigger -->
						<button
							class="btn btn-sm variant-ghost-surface"
							use:popup={{ event: 'click', target: 'account' }}
						>
							<UserCircle2 size={18} />
							<span>Account</span>
							<ChevronDown size={18} />
						</button>
						<!-- popup -->
						<div class="card p-4 w-40 shadow-xl" data-popup="account">
							<nav class="list-nav">
								<ul>
									<li>
										<a class="btn btn-sm variant-ghost-surface w-32" href="/account">
											<Settings size={18} />
											<span>Settings</span>
										</a>
									</li>
									<li>
										<form action="/logout" method="POST">
											<button type="submit" class="btn btn-sm variant-ghost-surface w-32 mt-4">
												<LogOut size={18} />
												<span>Log out</span>
											</button>
										</form>
									</li>
								</ul>
							</nav>
							<div class="arrow bg-surface-100-800-token" />
						</div>
					</div>
				{:else}
					<a class="btn btn-sm variant-ghost-surface" href="/login">
						<LogIn size={18} />
						<span>Log in</span>
					</a>
				{/if}
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>
