import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Separator } from "../ui/separator";
import { Play } from "lucide-react";
import TrackSummary from "./track-summary";

type MusicCardProps = {
  track: any; // FIXME: fix type
  className?: string;
  orientation?: "vertical" | "horizontal";
};

export default function MusicCard({
  track,
  className,
  orientation = "horizontal",
}: MusicCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-primary/20 bg-card/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group hover:cursor-pointer p-2",
        orientation == "vertical" && "",
        className,
      )}
    >
      <CardContent
        className={cn(
          "flex gap-3 items-center",
          orientation == "vertical" && "flex-col",
        )}
      >
        {/* <div className="aspect-square relative"> */}
        {/* <img
            src={track["album"]["cover_medium"]}
            alt={track["title"]}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          /> */}

        <TrackSummary track={track} />

        <div
          className={cn(
            orientation == "vertical"
              ? "w-full"
              : "flex h-10 w-1 items-center ml-auto",
          )}
        >
          <Separator
            orientation={orientation == "vertical" ? "horizontal" : "vertical"}
          />
        </div>

        <Rating>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} icon={<Play />} size={16} />
          ))}
        </Rating>
      </CardContent>
    </Card>
  );
}
