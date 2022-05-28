export interface Page {
  url: (...params: string[]) => string;
  route: string;
  title: string;
}

export const PAGES = {
  Home: {
    url: () => '/',
    route: '/',
    title: 'Home',
  },
};

export const getPageConfig = (route: string) =>
  Object.values(PAGES).find((page) => route === page.route);
