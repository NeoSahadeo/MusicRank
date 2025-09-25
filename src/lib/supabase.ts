import {
	createServerClient,
	parseCookieHeader,
	type CookieOptionsWithName,
} from "@supabase/ssr";
import {
	createClient,
	type SupabaseClientOptions,
} from "@supabase/supabase-js";
import type { AstroCookies } from "astro";

export const cookieOptions: CookieOptionsWithName = {
	path: "/",
	secure: true,
	httpOnly: true,
	sameSite: "lax",
};

type Context = {
	headers: Headers;
	cookies: AstroCookies;
};

export const createSupabaseServerInstance = (context: Context) =>
	// this is correct, the lsp for supabase is bugged
	createServerClient(
		import.meta.env.SUPABASE_URL,
		import.meta.env.SUPABASE_ANON_KEY,
		{
			cookieOptions,
			cookies: {
				getAll() {
					return parseCookieHeader(context.headers.get("Cookie") ?? "");
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						context.cookies.set(name, value, options),
					);
				},
			},
		},
	);

export const createSupabaseClientInstance = (
	options?: SupabaseClientOptions<"public">,
) =>
	createClient(
		import.meta.env.SUPABASE_URL,
		import.meta.env.SUPABASE_ANON_KEY,
		options,
	);
