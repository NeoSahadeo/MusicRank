import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MusicCardProps = {
	track: any; // fix type
	className?: string;
};

export default function MusicCard({ track, className }: MusicCardProps) {
	return (
		<Card
			className={cn(
				"overflow-hidden border-primary/20 bg-card/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group hover:cursor-pointer",
				className,
			)}
		>
			<CardContent className="p-0">
				<div className="aspect-square relative">
					<img
						src={track["album"]["cover_medium"]}
						alt={track["title"]}
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
				<div className="p-3">
					<h3 className="font-semibold truncate text-sm text-foreground">
						{track["title"]}
					</h3>
					<p className="text-xs text-muted-foreground truncate">
						{track["artist"]["name"]}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
