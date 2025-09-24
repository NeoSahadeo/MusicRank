import { cn } from "@/lib/utils";
import MusicCard from "./music-card";
import { useStore } from "@nanostores/react";
import {
  $cardOrientation,
  $layoutOrientation,
  toggleCardOrientation,
  toggleLayoutOrientation,
} from "@/stores/layout-config";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Grid2x2,
  LayoutList,
  RectangleHorizontal,
  RectangleVertical,
} from "lucide-react";
import { MusicRater } from "./music-rater";

interface MusicListProps {
  tracks: any[];
}

export default function MusicList({ tracks }: MusicListProps) {
  const cardOrientation = useStore($cardOrientation);
  const layoutOrientation = useStore($layoutOrientation);

  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full">
      <div className="flex gap-3">
        <Button onClick={toggleLayoutOrientation} variant="outline" size="icon">
          {layoutOrientation == "list" ? <LayoutList /> : <Grid2x2 />}
        </Button>

        <Button
          onClick={toggleCardOrientation}
          variant="outline"
          size="icon"
          disabled={layoutOrientation == "list"}
        >
          {cardOrientation == "vertical" ? (
            <RectangleVertical />
          ) : (
            <RectangleHorizontal />
          )}
        </Button>
      </div>

      <Separator />

      <div
        className={cn(
          "px-16 w-full",
          layoutOrientation == "list"
            ? "flex gap-3 flex-col"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6",
        )}
      >
        {tracks.map(
          (
            track: any, // FIXME: fix type
          ) => (
            // <MusicCard
            //   track={track}
            //   key={track["title"]}
            //   orientation={cardOrientation}
            // />
            <MusicRater
              key={track["title"]}
              track={track}
              orientation={cardOrientation}
            />
          ),
        )}
      </div>
    </div>
  );
}
