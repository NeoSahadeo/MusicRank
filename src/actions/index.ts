import { createSupabaseServerInstance } from "@/lib/supabase";
import { defineAction } from "astro:actions";

export const server = {
	googleSignIn: defineAction({
		handler: async (_, context) => {
			const supabase = createSupabaseServerInstance({
				headers: context.request.headers,
				cookies: context.cookies,
			});
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `http://localhost:4321/api/auth/callback`,
				},
			});
			console.log(data, error);
			return data.url;
		},
	}),
};
