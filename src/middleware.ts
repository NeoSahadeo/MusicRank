import { defineMiddleware, sequence } from "astro:middleware";
import { createSupabaseServerInstance } from "@/lib/supabase";

const auth = defineMiddleware(async (context, next) => {
	const cookies = context.cookies;
	const s = createSupabaseServerInstance({
		cookies: cookies,
		headers: context.request.headers,
	});
	const { data, error } = await s.auth.getUser();
	(context.locals as any).user = data;
	return next();
});

export const onRequest = sequence(auth);
