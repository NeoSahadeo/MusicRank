// TODO: Clean up code
// TODO: Set loading state for the pull on form open

import type { RefObject } from "react";
import { useState, useRef, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
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

function produceGetForm(track: DeezerTrack) {
  const d: Record<string, any> = {
    songId: track.id,
  };
  const f = new FormData();
  for (const key in d) {
    f.append(key, d[key]);
  }
  return f;
}

async function submitForm({
  track,
  reviewRef,
  rating,
}: {
  track: DeezerTrack;
  reviewRef: RefObject<HTMLTextAreaElement | null>;
  rating: number;
}) {
  const d1: Record<string, any> = {
    songId: track.id,
    rating: rating,
    review: reviewRef.current?.value ?? null,
  };
  const formDataD1 = new FormData();
  for (const key in d1) {
    formDataD1.append(key, d1[key]);
  }

  // GET FORM
  const formDataD2 = produceGetForm(track);

  const { data } = await actions.rankactions.getRank(formDataD2);
  if (data && data.length > 0) {
    await actions.rankactions.updateRank(formDataD1);
  } else {
    await actions.rankactions.postRank(formDataD1);
  }
}

export function MusicRater({ track, orientation }: MusicCardProps) {
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(
    track.rating ? track.rating / 10 : 0,
  );

  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const [reviewValue, setReviewValue] = useState<string>("");

  if (!track) return;

  useMemo(async () => {
    if (isOpen) {
      let review = "";
      const f = produceGetForm(track);
      const { data } = (await actions.rankactions.getRank(f)) as any as {
        data: RankingsTable[];
      };
      if (data && data.length > 0) {
        review = data[0].review;
        setRating(data[0].rating / 10);
      }
      setReviewValue(review);
    }
  }, [isOpen]);

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

          setSubmitting(true);
          submitForm({
            track,
            reviewRef,
            rating,
          });

          const formDataD2 = produceGetForm(track);

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
            <Textarea
              value={reviewValue}
              onChange={(e) => setReviewValue(e.target.value)}
              ref={reviewRef}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button
            disabled={submitting}
            variant="destructive"
            className="mr-auto"
            onClick={async () => {
              const f = new FormData();
              f.append("songId", track.id as any);
              setSubmitting(true);
              await actions.rankactions.deleteRank(f);
              // TODO: Probably change this to make it synced with the db
              setIsOpen(false);
              setRating(0);
              setReviewValue("");
              setSubmitting(false);
            }}
          >
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button
            onClick={async () => {
              setSubmitting(true);
              await submitForm({
                reviewRef,
                rating,
                track,
              });
              setIsOpen(false);
              setSubmitting(false);
            }}
            disabled={submitting}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
