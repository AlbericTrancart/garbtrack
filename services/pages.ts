import { languages } from './intl';

export interface Page {
  url: (...params: string[]) => string;
  route: string;
  title: Record<keyof typeof languages, string>;
}

const asPages = <T>(value: { [K in keyof T]: Page }) => value;

export const PAGES = asPages({
  Home: {
    url: () => '/',
    route: '/',
    title: {
      en: 'Home',
      fr: 'Accueil',
    },
  },
  About: {
    url: () => '/about',
    route: '/about',
    title: {
      en: 'About',
      fr: 'À propos',
    },
  },
});

export const getPageConfig = (route: string): Page | undefined =>
  Object.values(PAGES).find((page) => route === page.route);
