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
				"fui:group/avatar fui:relative fui:flex fui:size-8 fui:shrink-0 fui:rounded-full fui:select-none fui:after:absolute fui:after:inset-0 fui:after:rounded-full fui:after:border fui:after:border-border fui:after:mix-blend-darken fui:data-[size=lg]:size-10 fui:data-[size=sm]:size-6 fui:dark:after:mix-blend-lighten",
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
				"fui:aspect-square fui:size-full fui:rounded-full fui:object-cover",
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
				"fui:flex fui:size-full fui:items-center fui:justify-center fui:rounded-full fui:bg-muted fui:text-sm fui:text-muted-foreground fui:group-data-[size=sm]/avatar:text-xs",
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
				"fui:absolute fui:right-0 fui:bottom-0 fui:z-10 fui:inline-flex fui:items-center fui:justify-center fui:rounded-full fui:bg-primary fui:text-primary-foreground fui:bg-blend-color fui:ring-2 fui:ring-background fui:select-none",
				"fui:group-data-[size=sm]/avatar:size-2 fui:group-data-[size=sm]/avatar:[&>svg]:hidden",
				"fui:group-data-[size=default]/avatar:size-2.5 fui:group-data-[size=default]/avatar:[&>svg]:size-2",
				"fui:group-data-[size=lg]/avatar:size-3 fui:group-data-[size=lg]/avatar:[&>svg]:size-2",
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
				"fui:group/avatar-group fui:flex fui:-space-x-2 fui:*:data-[slot=avatar]:ring-2 fui:*:data-[slot=avatar]:ring-background",
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
				"fui:relative fui:flex fui:size-8 fui:shrink-0 fui:items-center fui:justify-center fui:rounded-full fui:bg-muted fui:text-sm fui:text-muted-foreground fui:ring-2 fui:ring-background fui:group-has-data-[size=lg]/avatar-group:size-10 fui:group-has-data-[size=sm]/avatar-group:size-6 fui:[&>svg]:size-4 fui:group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 fui:group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
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
