import { createSupabaseServerInstance } from "@/lib/supabase";
import { defineAction } from "astro:actions";

export const creds = {
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
			if (error) {
				// TODO: log error
			}
			return data.url;
		},
	}),
};
