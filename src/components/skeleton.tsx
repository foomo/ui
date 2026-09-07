import { cn } from "cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("lib:animate-pulse lib:rounded-xl lib:bg-muted", className)}
			{...props}
		/>
	);
}

export { Skeleton };
