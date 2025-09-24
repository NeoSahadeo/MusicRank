import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  track: any;
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
        <AvatarImage
          src={track["album"]["cover_medium"]}
          alt={track["title"]}
        />
        {/*FIXME: <AvatarFallback>??</AvatarFallback> */}
      </Avatar>

      <div
        className={cn(
          "flex flex-col p-3",
          orientation == "vertical" && "items-center justify-center",
        )}
      >
        <h3 className="font-semibold truncate text-sm text-foreground">
          {track["title"]}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {track["artist"]["name"]}
        </p>
      </div>
    </div>
  );
}
