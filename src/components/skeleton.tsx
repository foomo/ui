import { cn } from "@/lib/utils";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"lib:animate-pulse lib:rounded-md lib:bg-primary/10",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
