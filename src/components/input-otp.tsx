import { MinusIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";

function InputOTP({
	className,
	containerClassName,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
}) {
	return (
		<OTPInput
			data-slot="input-otp"
			containerClassName={cn(
				"cn-input-otp flex items-center has-disabled:opacity-50",
				containerClassName,
			)}
			spellCheck={false}
			className={cn("fui:disabled:cursor-not-allowed", className)}
			{...props}
		/>
	);
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn(
				"fui:flex fui:items-center fui:rounded-4xl fui:has-aria-invalid:border-destructive fui:has-aria-invalid:ring-[3px] fui:has-aria-invalid:ring-destructive/20 fui:dark:has-aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}

function InputOTPSlot({
	index,
	className,
	...props
}: React.ComponentProps<"div"> & {
	index: number;
}) {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			className={cn(
				"fui:relative fui:flex fui:size-9 fui:items-center fui:justify-center fui:border-y fui:border-r fui:border-input fui:bg-input/30 fui:text-sm fui:transition-all fui:outline-none fui:first:rounded-l-4xl fui:first:border-l fui:last:rounded-r-4xl fui:aria-invalid:border-destructive fui:data-[active=true]:z-10 fui:data-[active=true]:border-ring fui:data-[active=true]:ring-[3px] fui:data-[active=true]:ring-ring/50 fui:data-[active=true]:aria-invalid:border-destructive fui:data-[active=true]:aria-invalid:ring-destructive/20 fui:dark:data-[active=true]:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="fui:pointer-events-none fui:absolute fui:inset-0 fui:flex fui:items-center fui:justify-center">
					<div className="fui:h-4 fui:w-px fui:animate-caret-blink fui:bg-foreground fui:duration-1000" />
				</div>
			)}
		</div>
	);
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-separator"
			className="fui:flex fui:items-center fui:[&_svg:not([class*=size-])]:size-4"
			role="separator"
			{...props}
		>
			<MinusIcon />
		</div>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
