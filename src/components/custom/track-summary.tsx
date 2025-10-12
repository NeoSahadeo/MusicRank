import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { DeezerTrack } from "@/types/deezer";

interface Props {
  track: DeezerTrack;
  orientation?: "vertical" | "horizontal";
  avatarClass?: string;
}

interface ClickOpts {
  target: "_blank" | "_top" | "_self" | "_parent";
}

function handleClick(e: any, href = "", opts?: ClickOpts) {
  e.preventDefault();
  e.stopPropagation();

  window.open(href, opts?.target ?? "_self");
}

export default function TrackSummary({
  track,
  orientation = "horizontal",
  avatarClass,
}: Props) {
  console.log(track);
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
          <a
            onClick={(e) => handleClick(e, track.link, { target: "_blank" })}
            className="hover:underline"
          >
            {track.title}
          </a>
        </h3>
        <a
          onClick={(e) =>
            handleClick(e, track.artist.link, { target: "_blank" })
          }
          className="text-xs text-muted-foreground truncate hover:underline"
          target="_blank"
        >
          {track.artist.name}
        </a>
        <a
          onClick={(e) =>
            handleClick(
              e,
              `${import.meta.env.BASE_URL}viewer/album?id=${track.album.id}`,
            )
          }
          className="text-xs text-muted-foreground truncate hover:underline"
        >
          {track.album.title}
        </a>
      </div>
    </div>
  );
}
