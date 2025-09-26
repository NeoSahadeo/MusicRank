import {
	createSupabaseClientInstance,
	createSupabaseServerInstance,
} from "@/lib/supabase";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url: { searchParams } }) => {
	let page = 0;
	for (const [key, value] of searchParams.entries()) {
		switch (key) {
			case "page":
				page = parseInt(value);
				break;
		}
	}

	const supabase = createSupabaseClientInstance();

	const { data, error } = await supabase
		.from("rankings")
		.select()
		.range(page * 100, (page + 1) * 100 - 1);

	if (error) {
		return new Response(JSON.stringify(error), { status: 400 });
	}

	return new Response(JSON.stringify(data));
};

export const POST: APIRoute = async ({ request }) => {
	const supabase = createSupabaseClientInstance();
	return new Response();
};
