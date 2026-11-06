/**
 * Formatting for values shown as text outside a table cell: a date in a
 * description list or a sentence, a file size, a yes/no flag.
 *
 * Each formatter returns `""` (or `undefined` for `formatYesNo`) for a value
 * that is not set, so the result can go straight into a
 * `DescriptionListDetails`, which shows the empty dash for it.
 */

/** A date as a backend sends it: a `Date`, an ISO string or Unix milliseconds. */
type DateValue = Date | string | number | null | undefined;

/**
 * Parses a date, or returns `null` for a value that means "not set": `null`,
 * `undefined`, `""`, `0` (the Unix epoch), an unparseable string, and the zero
 * time some backends send for "never" (`0001-01-01`, Go's `time.Time{}`).
 */
function parseDate(value: DateValue): Date | null {
	if (value === null || value === undefined || value === "" || value === 0) {
		return null;
	}
	const date = value instanceof Date ? value : new Date(value);
	const time = date.getTime();
	if (Number.isNaN(time) || date.getUTCFullYear() <= 1) return null;
	return date;
}

/**
 * A date with its time, in the reader's locale by default: "20.5.2026,
 * 10:00:00". Pass `locale` and `format` (`Intl.DateTimeFormat` options) for a
 * fixed convention. An unset value (see `parseDate`) gives `""`.
 */
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

/**
 * A calendar day without a time, for copy that names a cut-off rather than an
 * instant: "not updated since 3 Mar 2026". The day is spelled with a short
 * month name by default; pass `locale` and `format` to change it. An unset
 * value (see `parseDate`) gives `""`.
 */
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

/**
 * A byte count in B, KB, MB or GB (steps of 1024). Whole bytes have no
 * fraction; larger sizes keep one decimal, enough to tell 1.2 MB from 12 MB.
 */
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

/**
 * A flag as words, for a description list: "Yes" or "No", or `undefined` for
 * an unknown flag, so `DescriptionListDetails` shows the empty dash.
 *
 * In a table column, use `BooleanCell` instead: an icon is quicker to scan
 * down a column of repeated values, while a list is read line by line.
 */
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
