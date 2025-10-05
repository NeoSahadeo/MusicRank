import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { DeezerTrack } from "@/types/deezer";

interface Props {
  track: DeezerTrack;
  orientation?: "vertical" | "horizontal";
  avatarClass?: string;
}

export default function TrackSummary({
  track,
  orientation = "horizontal",
  avatarClass,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center",
        orientation == "vertical" && "flex-col",
      )}
    >
      <Avatar className={cn("size-10", avatarClass)}>
        <AvatarImage src={track.album.cover_medium} alt={track.title} />
        {/*FIXME: <AvatarFallback>??</AvatarFallback> */}
      </Avatar>

      <div
        className={cn(
          "flex flex-col p-3",
          orientation == "vertical" && "items-center justify-center",
        )}
      >
        <h3 className="font-semibold truncate text-sm text-foreground">
          <a href={track.link} className="hover:underline">
            {track.title}
          </a>
        </h3>
        <a
          href={track.artist.link}
          className="text-xs text-muted-foreground truncate hover:underline"
          target="_blank"
        >
          {track.artist.name}
        </a>
      </div>
    </div>
  );
}
