import { zodResolver } from "@hookform/resolvers/zod";
import {
	CurrencyEurIcon,
	EnvelopeSimpleIcon,
	EyeIcon,
	EyeSlashIcon,
	MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Autocomplete,
	AutocompleteContent,
	AutocompleteEmpty,
	AutocompleteInput,
	AutocompleteItem,
	AutocompleteList,
} from "../components/autocomplete";
import { Button } from "../components/button";
import { Checkbox, CheckboxWithLabel } from "../components/checkbox";
import { DatePicker, DateRangePicker } from "../components/date-picker";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle,
} from "../components/field";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/form";
import { Input } from "../components/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "../components/input-group";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "../components/input-otp";
import { Label } from "../components/label";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../components/select";
import { Slider } from "../components/slider";
import { Switch } from "../components/switch";
import { Textarea } from "../components/textarea";

const regions = [
	{ value: "eu-central", label: "Europe (Frankfurt)" },
	{ value: "eu-west", label: "Europe (Dublin)" },
	{ value: "us-east", label: "US East (Virginia)" },
	{ value: "ap-south", label: "Asia (Singapore)" },
];

const cities = [
	"Amsterdam",
	"Berlin",
	"Dublin",
	"Frankfurt",
	"Lisbon",
	"London",
	"Madrid",
	"Munich",
	"Paris",
	"Singapore",
	"Vienna",
	"Zurich",
];

const schema = z.object({
	name: z.string().min(2, "Name needs at least two characters."),
	email: z.email("Enter a valid e-mail address."),
	password: z.string().min(8, "Use at least eight characters."),
	website: z.string().optional(),
	budget: z.number("Enter a number.").min(0, "Budget cannot be negative."),
	region: z.string().min(1, "Pick a region."),
	city: z.string().min(1, "Enter a city."),
	launchDate: z.date("Pick a launch date."),
	plan: z.enum(["starter", "team", "enterprise"]),
	seats: z.number().min(1).max(50),
	bio: z.string().max(200, "Keep the bio under 200 characters.").optional(),
	notifications: z.boolean(),
	terms: z.boolean().refine((value) => value, {
		message: "You need to accept the terms.",
	}),
	otp: z.string().length(6, "Enter the six-digit code."),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: Partial<FormValues> = {
	name: "",
	email: "",
	password: "",
	website: "",
	budget: 0,
	region: "",
	city: "",
	launchDate: undefined,
	plan: "team",
	seats: 5,
	bio: "",
	notifications: true,
	terms: false,
	otp: "",
};

function AllControlsForm() {
	const [submitted, setSubmitted] = React.useState<FormValues | null>(null);
	const [showPassword, setShowPassword] = React.useState(false);
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	return (
		<Form {...form}>
			<form
				className="fui:flex fui:w-full fui:max-w-xl fui:flex-col fui:gap-8"
				onSubmit={form.handleSubmit((values) => setSubmitted(values))}
				onReset={() => {
					form.reset();
					setSubmitted(null);
				}}
				noValidate
			>
				<FieldSet>
					<FieldLegend>Account</FieldLegend>
					<FieldDescription>
						Text inputs, input groups and a one-time code.
					</FieldDescription>
					<FieldGroup>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Ada Lovelace" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<InputGroup>
											<InputGroupAddon>
												<EnvelopeSimpleIcon />
											</InputGroupAddon>
											<InputGroupInput
												type="email"
												placeholder="ada@example.com"
												{...field}
											/>
										</InputGroup>
									</FormControl>
									<FormDescription>
										We only use this for sign-in and receipts.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<InputGroup>
											<InputGroupInput
												type={showPassword ? "text" : "password"}
												placeholder="At least eight characters"
												{...field}
											/>
											<InputGroupAddon align="inline-end">
												<InputGroupButton
													size="icon-xs"
													aria-label={
														showPassword ? "Hide password" : "Show password"
													}
													onClick={() => setShowPassword((value) => !value)}
												>
													{showPassword ? <EyeSlashIcon /> : <EyeIcon />}
												</InputGroupButton>
											</InputGroupAddon>
										</InputGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="website"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website</FormLabel>
									<FormControl>
										<InputGroup>
											<InputGroupAddon>
												<InputGroupText>https://</InputGroupText>
											</InputGroupAddon>
											<InputGroupInput placeholder="example.com" {...field} />
										</InputGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="budget"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Monthly budget</FormLabel>
									<FormControl>
										<InputGroup>
											<InputGroupAddon>
												<CurrencyEurIcon />
											</InputGroupAddon>
											<InputGroupInput
												type="number"
												min={0}
												{...field}
												onChange={(event) =>
													field.onChange(event.target.valueAsNumber)
												}
											/>
											<InputGroupAddon align="inline-end">
												<InputGroupText>/ month</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="otp"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Verification code</FormLabel>
									<FormControl>
										<InputOTP
											maxLength={6}
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
										>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>
										The code we sent to your e-mail address.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />

				<FieldSet>
					<FieldLegend>Workspace</FieldLegend>
					<FieldDescription>
						Select, autocomplete, date picker, radio group, slider and textarea.
					</FieldDescription>
					<FieldGroup>
						<FormField
							control={form.control}
							name="region"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Region</FormLabel>
									<Select
										value={field.value}
										onValueChange={(value) => field.onChange(value)}
									>
										<FormControl>
											<SelectTrigger className="fui:w-full">
												<SelectValue placeholder="Choose a region" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Regions</SelectLabel>
												{regions.map((region) => (
													<SelectItem key={region.value} value={region.value}>
														{region.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<Autocomplete
										items={cities}
										value={field.value}
										onValueChange={(value) => field.onChange(value)}
									>
										<FormControl>
											<AutocompleteInput
												className="fui:w-full"
												placeholder="Start typing a city"
												onBlur={field.onBlur}
											/>
										</FormControl>
										<AutocompleteContent>
											<AutocompleteEmpty>No matching city.</AutocompleteEmpty>
											<AutocompleteList>
												{(city: string) => (
													<AutocompleteItem key={city} value={city}>
														{city}
													</AutocompleteItem>
												)}
											</AutocompleteList>
										</AutocompleteContent>
									</Autocomplete>
									<FormDescription>
										Suggestions narrow as you type. Any value is accepted.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="launchDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Launch date</FormLabel>
									<FormControl>
										<DatePicker
											className="fui:w-full"
											value={field.value}
											onValueChange={(date) => field.onChange(date)}
											onBlur={field.onBlur}
											calendar={{ disabled: { before: new Date() } }}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="plan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Plan</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onValueChange={(value) => field.onChange(value)}
											className="fui:gap-3"
										>
											<Field orientation="horizontal">
												<RadioGroupItem value="starter" id="plan-starter" />
												<FieldLabel htmlFor="plan-starter">Starter</FieldLabel>
											</Field>
											<Field orientation="horizontal">
												<RadioGroupItem value="team" id="plan-team" />
												<FieldLabel htmlFor="plan-team">Team</FieldLabel>
											</Field>
											<Field orientation="horizontal">
												<RadioGroupItem
													value="enterprise"
													id="plan-enterprise"
												/>
												<FieldLabel htmlFor="plan-enterprise">
													Enterprise
												</FieldLabel>
											</Field>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="seats"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Seats: {field.value}</FormLabel>
									<FormControl>
										<Slider
											min={1}
											max={50}
											step={1}
											value={[field.value]}
											onValueChange={(value) =>
												field.onChange(Array.isArray(value) ? value[0] : value)
											}
										/>
									</FormControl>
									<FormDescription>Between 1 and 50 seats.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>About</FormLabel>
									<FormControl>
										<Textarea
											placeholder="A few words about your team"
											rows={3}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />

				<FieldSet>
					<FieldLegend>Preferences</FieldLegend>
					<FieldDescription>Switch and checkbox.</FieldDescription>
					<FieldGroup>
						<FormField
							control={form.control}
							name="notifications"
							render={({ field }) => (
								<FormItem orientation="horizontal">
									<FieldContent>
										<FormLabel>E-mail notifications</FormLabel>
										<FormDescription>
											Weekly digest and billing alerts.
										</FormDescription>
									</FieldContent>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={(checked) => field.onChange(checked)}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="terms"
							render={({ field }) => (
								<FormItem orientation="horizontal">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={(checked) => field.onChange(checked)}
										/>
									</FormControl>
									<FieldContent>
										<FormLabel>Accept the terms of service</FormLabel>
										<FormMessage />
									</FieldContent>
								</FormItem>
							)}
						/>
					</FieldGroup>
				</FieldSet>

				<div className="fui:flex fui:gap-2">
					<Button type="submit">Create workspace</Button>
					<Button type="reset" variant="outline">
						Reset
					</Button>
				</div>

				{submitted && (
					<pre className="fui:rounded-xl fui:bg-muted fui:p-4 fui:text-xs">
						{JSON.stringify(submitted, null, 2)}
					</pre>
				)}
			</form>
		</Form>
	);
}

type ControlState = "default" | "disabled" | "invalid";

const states: ControlState[] = ["default", "disabled", "invalid"];

function stateProps(state: ControlState) {
	return {
		disabled: state === "disabled",
		"aria-invalid": state === "invalid" || undefined,
	};
}

function StateColumn({ state }: { state: ControlState }) {
	const id = (name: string) => `${name}-${state}`;
	const invalid = state === "invalid";
	const error = invalid ? (
		<FieldError>This field has an error.</FieldError>
	) : null;

	return (
		<FieldGroup className="fui:gap-6">
			<FieldTitle className="fui:capitalize">{state}</FieldTitle>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("input")}>Input</FieldLabel>
				<Input
					id={id("input")}
					placeholder="Placeholder"
					{...stateProps(state)}
				/>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("input-filled")}>Input with value</FieldLabel>
				<Input
					id={id("input-filled")}
					defaultValue="Ada Lovelace"
					{...stateProps(state)}
				/>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("file")}>File</FieldLabel>
				<Input id={id("file")} type="file" {...stateProps(state)} />
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("group")}>Input group</FieldLabel>
				<InputGroup>
					<InputGroupAddon>
						<MagnifyingGlassIcon />
					</InputGroupAddon>
					<InputGroupInput
						id={id("group")}
						placeholder="Search"
						{...stateProps(state)}
					/>
					<InputGroupAddon align="inline-end">
						<InputGroupText>⌘K</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("group-textarea")}>
					Input group with textarea
				</FieldLabel>
				<InputGroup>
					<InputGroupTextarea
						id={id("group-textarea")}
						placeholder="Write a message"
						{...stateProps(state)}
					/>
					<InputGroupAddon align="block-end">
						<InputGroupText>0 / 200</InputGroupText>
						<InputGroupButton
							className="fui:ml-auto"
							variant="default"
							size="sm"
							disabled={state === "disabled"}
						>
							Send
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("textarea")}>Textarea</FieldLabel>
				<Textarea
					id={id("textarea")}
					placeholder="Placeholder"
					rows={3}
					{...stateProps(state)}
				/>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("select")}>Select</FieldLabel>
				<Select disabled={state === "disabled"}>
					<SelectTrigger
						id={id("select")}
						className="fui:w-full"
						aria-invalid={invalid || undefined}
					>
						<SelectValue placeholder="Choose a region" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{regions.map((region) => (
								<SelectItem key={region.value} value={region.value}>
									{region.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("select-sm")}>Select, small</FieldLabel>
				<Select defaultValue="eu-central" disabled={state === "disabled"}>
					<SelectTrigger
						id={id("select-sm")}
						size="sm"
						className="fui:w-full"
						aria-invalid={invalid || undefined}
					>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{regions.map((region) => (
								<SelectItem key={region.value} value={region.value}>
									{region.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("autocomplete")}>Autocomplete</FieldLabel>
				<Autocomplete items={cities} disabled={state === "disabled"}>
					<AutocompleteInput
						id={id("autocomplete")}
						className="fui:w-full"
						placeholder="Start typing a city"
						aria-invalid={invalid || undefined}
					/>
					<AutocompleteContent>
						<AutocompleteEmpty>No matching city.</AutocompleteEmpty>
						<AutocompleteList>
							{(city: string) => (
								<AutocompleteItem key={city} value={city}>
									{city}
								</AutocompleteItem>
							)}
						</AutocompleteList>
					</AutocompleteContent>
				</Autocomplete>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("autocomplete-sm")}>
					Autocomplete, small with clear
				</FieldLabel>
				<Autocomplete
					items={cities}
					defaultValue={state === "default" ? "" : "Berlin"}
					disabled={state === "disabled"}
				>
					<AutocompleteInput
						id={id("autocomplete-sm")}
						size="sm"
						showClear
						className="fui:w-full"
						placeholder="Start typing a city"
						aria-invalid={invalid || undefined}
					/>
					<AutocompleteContent>
						<AutocompleteEmpty>No matching city.</AutocompleteEmpty>
						<AutocompleteList>
							{(city: string) => (
								<AutocompleteItem key={city} value={city}>
									{city}
								</AutocompleteItem>
							)}
						</AutocompleteList>
					</AutocompleteContent>
				</Autocomplete>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("date")}>Date picker</FieldLabel>
				<DatePicker
					id={id("date")}
					className="fui:w-full"
					defaultValue={state === "default" ? undefined : new Date(2026, 8, 22)}
					{...stateProps(state)}
				/>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("date-range")}>Date range, small</FieldLabel>
				<DateRangePicker
					id={id("date-range")}
					size="sm"
					className="fui:w-full"
					defaultValue={
						state === "default"
							? undefined
							: { from: new Date(2026, 8, 1), to: new Date(2026, 8, 22) }
					}
					{...stateProps(state)}
				/>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel htmlFor={id("otp")}>One-time code</FieldLabel>
				<InputOTP
					id={id("otp")}
					maxLength={6}
					defaultValue={state === "default" ? "" : "123456"}
					{...stateProps(state)}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel>Radio group</FieldLabel>
				<RadioGroup
					defaultValue="team"
					disabled={state === "disabled"}
					aria-invalid={invalid || undefined}
				>
					<Field orientation="horizontal">
						<RadioGroupItem value="starter" id={id("radio-starter")} />
						<FieldLabel htmlFor={id("radio-starter")}>Starter</FieldLabel>
					</Field>
					<Field orientation="horizontal">
						<RadioGroupItem value="team" id={id("radio-team")} />
						<FieldLabel htmlFor={id("radio-team")}>Team</FieldLabel>
					</Field>
				</RadioGroup>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel>Checkbox</FieldLabel>
				<div className="fui:flex fui:flex-col fui:gap-3">
					<CheckboxWithLabel label="Unchecked" {...stateProps(state)} />
					<CheckboxWithLabel
						label="Checked"
						defaultChecked
						{...stateProps(state)}
					/>
					<CheckboxWithLabel
						label="Indeterminate"
						indeterminate
						{...stateProps(state)}
					/>
				</div>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel>Switch</FieldLabel>
				<div className="fui:flex fui:flex-col fui:gap-3">
					<Label>
						<Switch {...stateProps(state)} /> Off
					</Label>
					<Label>
						<Switch defaultChecked {...stateProps(state)} /> On
					</Label>
					<Label>
						<Switch size="sm" defaultChecked {...stateProps(state)} /> Small
					</Label>
				</div>
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel>Slider</FieldLabel>
				<Slider defaultValue={[35]} disabled={state === "disabled"} />
				<Slider defaultValue={[20, 65]} disabled={state === "disabled"} />
				{error}
			</Field>

			<Field data-invalid={invalid}>
				<FieldLabel>Field card</FieldLabel>
				<FieldLabel htmlFor={id("card")}>
					<Field orientation="horizontal">
						<Checkbox id={id("card")} defaultChecked {...stateProps(state)} />
						<FieldContent>
							<FieldTitle>Bordered field</FieldTitle>
							<FieldDescription>
								A label wrapping a field renders as a selectable card.
							</FieldDescription>
						</FieldContent>
					</Field>
				</FieldLabel>
				{error}
			</Field>
		</FieldGroup>
	);
}

function ControlStates() {
	return (
		<div className="fui:grid fui:w-full fui:max-w-5xl fui:grid-cols-1 fui:gap-10 fui:md:grid-cols-3">
			{states.map((state) => (
				<StateColumn key={state} state={state} />
			))}
		</div>
	);
}

const meta = {
	title: "Form",
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllControls: Story = {
	render: () => <AllControlsForm />,
};

export const States: Story = {
	render: () => <ControlStates />,
};
