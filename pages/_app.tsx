import { AppProps } from 'next/app';
import Head from 'next/head';
import { CSSResets } from 'components/CSSResets/CSSResets';
import Router, { useRouter } from 'next/router';
import { getPageConfig } from 'services/pages';
import { Header } from 'components/Header/Header';
import { PageContainer } from 'components/Layout/Layout';
import { Footer } from 'components/Footer/Footer';
import '@reach/checkbox/styles.css';
import { IntlProvider } from 'react-intl';
import { isValidLocale, languages } from 'services/intl';
import en from 'locale/en.json';
import fr from 'locale/fr.json';
import { initChartConfig } from 'services/charts';

initChartConfig();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  // from https://github.com/vercel/next.js/issues/3249
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const messages = isValidLocale(locale) ? languages[locale] : languages.en;

  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });

  const config = getPageConfig(router.route);
  const localeToUse = isValidLocale(locale) ? locale : 'en';
  const title = config ? `Garbtrack | ${config.title[localeToUse]}` : 'Garbtrack';

  return (
    <IntlProvider messages={messages} locale={locale ?? 'en'} defaultLocale={defaultLocale}>
      <Head>
        <title>{title}</title>

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        <link rel="alternate" hrefLang="fr-fr" href={`https://garbtrack.earth${router.pathname}`} />
        <link rel="alternate" hrefLang="en-us" href={`https://garbtrack.earth${router.pathname}`} />

        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:url" content={`https://garbtrack.earth${router.pathname}`} />
        {locale === 'fr' ? (
          <>
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:description" content={fr.header.slogan} />
            <meta name="description" content={fr.header.slogan} />
          </>
        ) : (
          <>
            <meta property="og:locale" content="en_US" />
            <meta property="og:description" content={en.header.slogan} />
            <meta name="description" content={en.header.slogan} />
          </>
        )}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Garbtrack" />
        <meta property="og:image" content="https://garbtrack.earth/android-chrome-512x512.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Garbtrack logo" />
      </Head>

      <CSSResets />

      <Header isHomepage={config?.route === '/'} />

      <PageContainer>
        {/* @ts-expect-error Too lazy to fix typing */}
        <Component {...pageProps} />
      </PageContainer>

      <Footer />
    </IntlProvider>
  );
};

export default App;
