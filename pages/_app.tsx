import { AppProps } from 'next/app';
import Head from 'next/head';
import { CSSResets } from 'components/CSSResets';
import Router, { useRouter } from 'next/router';
import { getPageConfig } from 'services/pages';
import { Header } from 'components/Header';
import { PageContainer } from 'components/Layout';
import { Footer } from 'components/Footer';
import '@reach/checkbox/styles.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  // from https://github.com/vercel/next.js/issues/3249
  const router = useRouter();
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });

  const config = getPageConfig(router.route);
  const title = config ? `Garbtrack | ${config.title}` : 'Garbtrack';

  return (
    <>
      <Head>
        <title>{title}</title>

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:url" content={`https://garbtrack.earth${router.pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="The simple waste tracker" />
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
    </>
  );
};

export default App;
