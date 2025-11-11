import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
	React.ElementRef<typeof OTPInput>,
	React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
	<OTPInput
		ref={ref}
		containerClassName={cn(
			"flex items-center gap-2 has-[:disabled]:opacity-50",
			containerClassName,
		)}
		className={cn("lib:disabled:cursor-not-allowed", className)}
		{...props}
	/>
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
	React.ElementRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("lib:flex lib:items-center", className)}
		{...props}
	/>
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
	React.ElementRef<"div">,
	React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

	return (
		<div
			ref={ref}
			className={cn(
				"lib:relative lib:flex lib:h-9 lib:w-9 lib:items-center lib:justify-center lib:border-y lib:border-r lib:border-input lib:text-sm lib:shadow-sm lib:transition-all lib:first:rounded-l-md lib:first:border-l lib:last:rounded-r-md",
				isActive && "lib:z-10 lib:ring-1 lib:ring-ring",
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
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
	React.ElementRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
	<div ref={ref} role="separator" {...props}>
		<Minus />
	</div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
