import { createSupabaseServerInstance } from "@/lib/supabase";
import type { RankingsTable } from "@/types/supabase";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const defaultSchema = {
	rating: z.number().min(0).max(5).step(0.5),
	review: z.string(),
	songId: z.number(),
};

export const rankactions = {
	getAllRankings: defineAction({
		handler: async (_, context): Promise<any[]> => {
			const supabase = createSupabaseServerInstance({
				headers: context.request.headers,
				cookies: context.cookies,
			});

			const userId = (await supabase.auth.getUser()).data.user?.id;
			const { data, error } = await supabase
				.from("rankings")
				.select()
				.eq("user_id", userId);
			if (error) console.log(error);
			return data as RankingsTable[];
		},
	}),
	getRank: defineAction({
		accept: "form",
		input: z.object({
			songId: z.number(),
		}),
		handler: async ({ songId }, context): Promise<any[] | null> => {
			const supabase = createSupabaseServerInstance({
				headers: context.request.headers,
				cookies: context.cookies,
			});
			const { data, error } = await supabase
				.from("rankings")
				.select()
				.eq("song_id", songId);
			if (error) console.log(error);
			return data as RankingsTable[];
		},
	}),

	postRank: defineAction({
		accept: "form",
		input: z.object(defaultSchema),
		handler: async ({ rating, review, songId }, context) => {
			const supabase = createSupabaseServerInstance({
				headers: context.request.headers,
				cookies: context.cookies,
			});
			const { error } = await supabase.from("rankings").insert({
				rating: rating * 10, // INFO: must multiply to reduce to int
				review: review,
				song_id: songId,
			});
			if (error) console.log(error);
		},
	}),

	updateRank: defineAction({
		accept: "form",
		input: z.object(defaultSchema),
		handler: async ({ rating, review, songId }, context) => {
			const supabase = createSupabaseServerInstance({
				headers: context.request.headers,
				cookies: context.cookies,
			});
			const userId = (await supabase.auth.getUser()).data.user?.id;

			const { error } = await supabase
				.from("rankings")
				.update({
					rating: rating * 10, // INFO: must multiply to reduce to int
					review: review,
				})
				.eq("user_id", userId)
				.eq("song_id", songId);
			if (error) console.log(error);
		},
	}),

	deleteRank: defineAction({
		accept: "form",
		input: z.object({
			songId: z.string().max(255), // SUGGESTION: might change
		}),
		handler: async ({ songId }, context) => {
			const supabase = createSupabaseServerInstance({
				headers: context.request.headers,
				cookies: context.cookies,
			});
			const userId = (await supabase.auth.getUser()).data.user?.id;

			const { error } = await supabase
				.from("rankings")
				.delete()
				.eq("user_id", userId)
				.eq("song_id", songId);
			if (error) console.log(error);
		},
	}),
};
