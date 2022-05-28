import keys from 'lodash/keys';
import en from 'locale/en.json';
import fr from 'locale/fr.json';
import format from 'date-fns/format';
import dateFnsEn from 'date-fns/locale/en-US';
import dateFnsFr from 'date-fns/locale/fr';

type Message = string | NestedDictionary;

interface NestedDictionary {
  [x: string]: Message;
}

interface FlattenedDictionary {
  [x: string]: string;
}

const flattenMessages = (nestedMessages: NestedDictionary, prefix = ''): FlattenedDictionary =>
  keys(nestedMessages).reduce((messages: FlattenedDictionary, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

export const languages = {
  en: flattenMessages(en),
  fr: flattenMessages(fr),
};

export const isValidLocale = (locale: unknown): locale is keyof typeof languages =>
  typeof locale === 'string' && locale in languages;

const dateFnsLocales = {
  en: dateFnsEn,
  fr: dateFnsFr,
};

export const formatDate = (date: Date, formatString: string, locale: string) => {
  const localeToUse = isValidLocale(locale) ? locale : 'en';

  return format(date, formatString, { locale: dateFnsLocales[localeToUse] });
};
