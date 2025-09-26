import { assert, assertEquals } from "jsr:@std/assert@1";
// import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";
import "jsr:@std/dotenv/load";

import axios from "axios";

// Load configuration from environment variables
// const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
// const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
// const options = {
// 	auth: {
// 		autoRefreshToken: false,
// 		persistSession: false,
// 		detectSessionInUrl: false,
// 	},
// };
// if (!supabaseUrl) throw new Error("SUPABASE_URL is required");
// if (!supabaseKey) throw new Error("SUPABASE_ANON_KEY is required");
// const client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

Deno.test("Queries rankings", async () => {
	// assert(data, "Expected data from table query");
	const r = await axios.get(
		"http://localhost:4321/api/supabase/rankings?page=0",
	);
	assertEquals(r.status, 200, `Error querying rankings, status:${r.status}`);
});

Deno.test("Queries post ranking", async () => {
	const r = await axios.post(
		"http://localhost:4321/api/supabase/rankings",
		JSON.stringify({}),
	);
});
