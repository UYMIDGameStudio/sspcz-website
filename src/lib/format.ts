import type { Locale } from './issueData';

const EN_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const EN_MONTHS_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CN_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const EN_ORDINALS = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
];

/** YAML dates parse as UTC midnight; always read with UTC getters. */
export function dateRange(start: Date, end: Date, locale: Locale): string {
  const y = start.getUTCFullYear();
  const m1 = start.getUTCMonth();
  const m2 = end.getUTCMonth();
  const d1 = start.getUTCDate();
  const d2 = end.getUTCDate();
  if (locale === 'zh') {
    return m1 === m2
      ? `${y}年${m1 + 1}月${d1}–${d2}日`
      : `${y}年${m1 + 1}月${d1}日–${m2 + 1}月${d2}日`;
  }
  return m1 === m2
    ? `${EN_MONTHS[m1]} ${d1}–${d2}, ${y}`
    : `${EN_MONTHS[m1]} ${d1} – ${EN_MONTHS[m2]} ${d2}, ${y}`;
}

export function shortDate(date: Date, locale: Locale): string {
  const m = date.getUTCMonth();
  const d = date.getUTCDate();
  return locale === 'zh' ? `${m + 1}月${d}日` : `${EN_MONTHS[m]} ${d}`;
}

export function monthYear(v: { year: number; month: number }, locale: Locale): string {
  return locale === 'zh'
    ? `${v.year}年${v.month}月`
    : `${EN_MONTHS_FULL[v.month - 1]} ${v.year}`;
}

export function sessionLabel(n: number, locale: Locale): string {
  return locale === 'zh'
    ? `第${CN_NUMERALS[n - 1]}届`
    : `The ${EN_ORDINALS[n - 1]} Session`;
}

/** Theme rendered with locale-appropriate quotation marks (RFC-200 §2). */
export function quotedTheme(locale: Locale, theme: { zh: string; en: string }): string {
  return locale === 'zh' ? `「${theme.zh}」` : `“${theme.en}”`;
}
