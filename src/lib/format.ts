type DateValue = Date | string | number | null | undefined;

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Parses a date, or returns `null` for "not set": `null`, `undefined`, `""`,
 * `0`, an unparseable string, or the zero time (`0001-01-01`, Go's `time.Time{}`).
 */
function parseDate(value: DateValue): Date | null {
	if (value === null || value === undefined || value === "" || value === 0) {
		return null;
	}
	const date =
		value instanceof Date
			? value
			: typeof value === "string" && DATE_ONLY.test(value)
				? parseLocalDay(value)
				: new Date(value);
	if (!date || Number.isNaN(date.getTime()) || date.getUTCFullYear() <= 1) {
		return null;
	}
	return date;
}

// `new Date("2026-03-03")` is UTC midnight, which is the previous day west of UTC.
function parseLocalDay(value: string): Date | null {
	const [year, month, day] = value.split("-").map(Number) as [
		number,
		number,
		number,
	];
	const date = new Date(year, month - 1, day);
	// The constructor maps years 0–99 to 1900–1999.
	date.setFullYear(year);
	return date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}

function formatDateTime(
	value: DateValue,
	{
		locale,
		format,
	}: { locale?: string; format?: Intl.DateTimeFormatOptions } = {},
): string {
	const date = parseDate(value);
	return date ? date.toLocaleString(locale, format) : "";
}

function formatDate(
	value: DateValue,
	{
		locale,
		format = { year: "numeric", month: "short", day: "numeric" },
	}: { locale?: string; format?: Intl.DateTimeFormatOptions } = {},
): string {
	const date = parseDate(value);
	return date ? date.toLocaleDateString(locale, format) : "";
}

/** Bytes in B, KB, MB or GB, in steps of 1024. */
function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	let value = bytes;
	let unit = "B";
	for (const next of ["KB", "MB", "GB"]) {
		if (value < 1024) break;
		value /= 1024;
		unit = next;
	}
	return `${value.toFixed(1)} ${unit}`;
}

/** `undefined` for an unknown flag, so `DescriptionListDetails` shows the empty dash. */
function formatYesNo(
	value: boolean | null | undefined,
	{ yes = "Yes", no = "No" }: { yes?: string; no?: string } = {},
): string | undefined {
	if (value === null || value === undefined) return undefined;
	return value ? yes : no;
}

export {
	type DateValue,
	formatBytes,
	formatDate,
	formatDateTime,
	formatYesNo,
	parseDate,
};
