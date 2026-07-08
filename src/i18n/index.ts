import zh from './zh';
import en from './en';

export type Locale = 'zh' | 'en';

const dicts = { zh, en } as const;

export function t(locale: Locale) {
  return dicts[locale];
}
