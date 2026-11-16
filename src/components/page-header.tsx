import { cn } from "cn";
import type * as React from "react";

function PageHeader({
	title,
	description,
	actions,
	className,
}: {
	title: React.ReactNode;
	description?: React.ReactNode;
	actions?: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			data-slot="page-header"
			className={cn(
				"fui:flex fui:flex-wrap fui:items-center fui:justify-between fui:gap-3",
				className,
			)}
		>
			<div className="fui:flex fui:flex-col fui:gap-1">
				<h1 className="fui:font-heading fui:text-xl fui:font-medium">
					{title}
				</h1>
				{description ? (
					<p className="fui:text-sm fui:text-muted-foreground">{description}</p>
				) : null}
			</div>
			{actions ? (
				<div className="fui:flex fui:items-center fui:gap-2">{actions}</div>
			) : null}
		</div>
	);
}

export { PageHeader };
