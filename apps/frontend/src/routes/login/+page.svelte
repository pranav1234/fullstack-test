<div class="bg-primary-50 flex min-h-screen items-center justify-center px-4">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
		<h2 class="text-primary-900 mb-6 text-center text-2xl font-bold">Log in to your account</h2>

		<form class="space-y-6">
			<div class="space-y-2">
				<label for="email" class="text-primary-900 text-sm font-medium">Email</label>
				<input
					type="email"
					id="email"
					class="border-primary-200 focus:ring-primary-500 w-full rounded-md border p-2 focus:outline-none focus:ring-2"
					placeholder="Enter your email"
					required
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="text-primary-900 text-sm font-medium">Password</label>
				<input
					type="password"
					id="password"
					class="border-primary-200 focus:ring-primary-500 w-full rounded-md border p-2 focus:outline-none focus:ring-2"
					placeholder="Enter your password"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full rounded-md bg-blue-800 px-4 py-2 text-white transition-colors hover:bg-blue-900"
			>
				Sign in
			</button>
		</form>
	</div>
</div>
