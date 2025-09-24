import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies }) => {
  console.log(request.headers);
  return new Response(JSON.stringify(""), { status: 269 });
};
