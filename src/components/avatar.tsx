import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "cn";
import type * as React from "react";

function Avatar({
	className,
	size = "default",
	...props
}: AvatarPrimitive.Root.Props & {
	size?: "default" | "sm" | "lg";
}) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={cn(
				"lib:group/avatar lib:relative lib:flex lib:size-8 lib:shrink-0 lib:rounded-full lib:select-none lib:after:absolute lib:after:inset-0 lib:after:rounded-full lib:after:border lib:after:border-border lib:after:mix-blend-darken lib:data-[size=lg]:size-10 lib:data-[size=sm]:size-6 lib:dark:after:mix-blend-lighten",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn(
				"lib:aspect-square lib:size-full lib:rounded-full lib:object-cover",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarFallback({
	className,
	...props
}: AvatarPrimitive.Fallback.Props) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"lib:flex lib:size-full lib:items-center lib:justify-center lib:rounded-full lib:bg-muted lib:text-sm lib:text-muted-foreground lib:group-data-[size=sm]/avatar:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="avatar-badge"
			className={cn(
				"lib:absolute lib:right-0 lib:bottom-0 lib:z-10 lib:inline-flex lib:items-center lib:justify-center lib:rounded-full lib:bg-primary lib:text-primary-foreground lib:bg-blend-color lib:ring-2 lib:ring-background lib:select-none",
				"lib:group-data-[size=sm]/avatar:size-2 lib:group-data-[size=sm]/avatar:[&>svg]:hidden",
				"lib:group-data-[size=default]/avatar:size-2.5 lib:group-data-[size=default]/avatar:[&>svg]:size-2",
				"lib:group-data-[size=lg]/avatar:size-3 lib:group-data-[size=lg]/avatar:[&>svg]:size-2",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group"
			className={cn(
				"lib:group/avatar-group lib:flex lib:-space-x-2 lib:*:data-[slot=avatar]:ring-2 lib:*:data-[slot=avatar]:ring-background",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarGroupCount({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group-count"
			className={cn(
				"lib:relative lib:flex lib:size-8 lib:shrink-0 lib:items-center lib:justify-center lib:rounded-full lib:bg-muted lib:text-sm lib:text-muted-foreground lib:ring-2 lib:ring-background lib:group-has-data-[size=lg]/avatar-group:size-10 lib:group-has-data-[size=sm]/avatar-group:size-6 lib:[&>svg]:size-4 lib:group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 lib:group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarBadge,
};
