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

type MusicCardProps = {
  track: any; // FIXME: fix type
  className?: string;
  orientation?: "vertical" | "horizontal";
};

export function MusicRater({ track, orientation }: MusicCardProps) {
  if (!track) return;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>
          <MusicCard track={track} orientation={orientation} />
        </span>
      </DialogTrigger>
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
          <Rating>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton key={index} icon={<Play />} size={18} />
            ))}
          </Rating>
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
