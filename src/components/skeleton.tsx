import { cn } from "cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("fui:animate-pulse fui:rounded-xl fui:bg-muted", className)}
			{...props}
		/>
	);
}

export { Skeleton };
