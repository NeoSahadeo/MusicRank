import {
	createSupabaseClientInstance,
	createSupabaseServerInstance,
} from "@/lib/supabase";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, request }) => {
	const supabase = createSupabaseClientInstance();
	const { data, error } = await supabase.from("rankings").select("*");
	console.log(error);
	return new Response(JSON.stringify(data));
};
