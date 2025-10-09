import { act, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MusicCard from "./music-card";
import TrackSummary from "./track-summary";
import { Separator } from "../ui/separator";
import { Rating, RatingButton } from "../ui/shadcn-io/rating";
import { Play } from "lucide-react";
import type { DeezerTrack } from "@/types/deezer";
import type { RankingsTable } from "@/types/supabase";

import { actions } from "astro:actions";

type MusicCardProps = {
  track: DeezerTrack;
  className?: string;
  orientation?: "vertical" | "horizontal";
};

export function MusicRater({ track, orientation }: MusicCardProps) {
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(
    track.rating ? track.rating / 10 : 0,
  );

  if (!track) return;

  function RatingComponent({ ...props }) {
    return (
      <Rating
        readOnly={submitting}
        value={rating}
        onValueChange={async (e) => {
          if (submitting) return;

          const initialValue = rating;
          setRating(e);

          // INFO: Handle submit through dialog if open
          if (isOpen) return;

          // POST/UPDATE FORM
          const d1: Record<string, any> = {
            songId: track.id,
            rating: e,
            review: null,
          };
          const formDataD1 = new FormData();
          for (const key in d1) {
            formDataD1.append(key, d1[key]);
          }

          // GET FORM
          const d2: Record<string, any> = {
            songId: track.id,
          };
          const formDataD2 = new FormData();
          for (const key in d2) {
            formDataD2.append(key, d2[key]);
          }

          setSubmitting(true);
          const { data } = await actions.rankactions.getRank(formDataD2);
          if (data && data.length > 0) {
            await actions.rankactions.updateRank(formDataD1);
          } else {
            await actions.rankactions.postRank(formDataD1);
          }
          const p = await actions.rankactions.getRank(formDataD2);
          if (p.data && p.data?.length > 0) {
            setRating((p.data[0] as RankingsTable).rating / 10);
          } else {
            setRating(initialValue);
          }
          setSubmitting(false);
        }}
        {...props}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton
            key={index}
            icon={<Play />}
            size={16}
            className={`${submitting && "hover:cursor-progress"}`}
          />
        ))}
      </Rating>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <span className="flex w-full border-1 rounded-lg pr-3">
        <DialogTrigger asChild>
          <span className="flex-1">
            <MusicCard
              className="outline-none border-0 bg-transparent rounded-3xl"
              track={track}
              orientation={orientation}
            />
          </span>
        </DialogTrigger>
        <Separator
          orientation={orientation == "vertical" ? "horizontal" : "vertical"}
        />
        <RatingComponent className="ml-auto" />
      </span>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription> */}

          <TrackSummary
            avatarClass="size-15"
            track={track}
            orientation="vertical"
          />
        </DialogHeader>

        <Separator />

        <div className="w-full flex flex-col items-center justify-center gap-3 my-2">
          <Label htmlFor="review">Rating</Label>
          <RatingComponent />
        </div>

        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="review">Review</Label>
            <Textarea id="review" />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>

          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
