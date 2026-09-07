import { cn } from "cn";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
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
			className={cn("lib:disabled:cursor-not-allowed", className)}
			{...props}
		/>
	);
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn(
				"lib:flex lib:items-center lib:rounded-4xl lib:has-aria-invalid:border-destructive lib:has-aria-invalid:ring-[3px] lib:has-aria-invalid:ring-destructive/20 lib:dark:has-aria-invalid:ring-destructive/40",
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
				"lib:relative lib:flex lib:size-9 lib:items-center lib:justify-center lib:border-y lib:border-r lib:border-input lib:bg-input/30 lib:text-sm lib:transition-all lib:outline-none lib:first:rounded-l-4xl lib:first:border-l lib:last:rounded-r-4xl lib:aria-invalid:border-destructive lib:data-[active=true]:z-10 lib:data-[active=true]:border-ring lib:data-[active=true]:ring-[3px] lib:data-[active=true]:ring-ring/50 lib:data-[active=true]:aria-invalid:border-destructive lib:data-[active=true]:aria-invalid:ring-destructive/20 lib:dark:data-[active=true]:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="lib:pointer-events-none lib:absolute lib:inset-0 lib:flex lib:items-center lib:justify-center">
					<div className="lib:h-4 lib:w-px lib:animate-caret-blink lib:bg-foreground lib:duration-1000" />
				</div>
			)}
		</div>
	);
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-separator"
			className="lib:flex lib:items-center lib:[&_svg:not([class*=size-])]:size-4"
			role="separator"
			{...props}
		>
			<MinusIcon />
		</div>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
