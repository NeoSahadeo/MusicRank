import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { type APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
	console.log(context.request.url);
	// console.log(request);
	// console.log(request.headers);
	// console.log(cookies);

	// if (code) {
	// 	const supabase = createServerClient(
	// 		import.meta.env.SUPABASE_URL,
	// 		import.meta.env.SUPABASE_ANON_KEY,
	// 		{
	// 			cookies: {
	// 				getAll() {
	// 					return parseCookieHeader(Astro.request.headers.get("Cookie") ?? "");
	// 				},
	// 				setAll(cookiesToSet) {
	// 					cookiesToSet.forEach(({ name, value, options }) =>
	// 						Astro.cookies.set(name, value, options),
	// 					);
	// 				},
	// 			},
	// 		},
	// 	);
	//
	// 	const { error } = await supabase.auth.exchangeCodeForSession(code);
	// 	console.log(error, "error");
	//
	// 	if (!error) {
	// 		return redirect(next);
	// 	}
	// }
	return new Response(JSON.stringify(""), { status: 269 });

	// // return the user to an error page with instructions
	// return redirect("/auth/auth-code-error");
};
