import { cn } from "cn";
import type * as React from "react";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/card";

function SectionCard({
	title,
	description,
	action,
	className,
	children,
}: {
	title?: React.ReactNode;
	description?: React.ReactNode;
	action?: React.ReactNode;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<Card data-slot="section-card" className={className}>
			{title || description || action ? (
				<CardHeader>
					{title ? <CardTitle>{title}</CardTitle> : null}
					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
					{action ? <CardAction>{action}</CardAction> : null}
				</CardHeader>
			) : null}
			<CardContent>{children}</CardContent>
		</Card>
	);
}

// A viewport breakpoint, not a container query: a container takes no width
// from its content, so the grid would collapse in a fit-content parent.
function SectionCardGrid({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			data-slot="section-card-grid"
			className={cn("fui:grid fui:gap-6 fui:lg:grid-cols-2", className)}
		>
			{children}
		</div>
	);
}

export { SectionCard, SectionCardGrid };
