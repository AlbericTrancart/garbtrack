import React from 'react';
import styled from 'styled-components';
import { Divider } from 'components/Divider/Divider';
import { Link, StyledLink } from 'components/Link/Link';
import { PAGE_WIDTH } from 'components/Layout/Layout';
import { getSpacing, typography } from 'stylesheet';
import { FormattedMessage } from 'react-intl';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { PAGES } from 'services/pages';

const Container = styled.footer`
  max-width: ${PAGE_WIDTH};
  margin: 0 auto;
  padding: 0 ${getSpacing(2)} ${getSpacing(4)} ${getSpacing(2)};
  text-decoration: italic;
  text-align: center;
  ${typography.small}
`;

export const Footer: React.FC = () => {
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE']);
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    void router.push('/', '/', { locale: newLocale });
    if (cookie.NEXT_LOCALE !== newLocale) {
      setCookie('NEXT_LOCALE', newLocale, { path: '/' });
    }
  };

  return (
    <Container>
      <Divider />
      <p>
        <Link href={PAGES.About.url()}>
          <FormattedMessage id="footer.about" />
        </Link>
        <br />
        <StyledLink
          as="button"
          onClick={() => switchLocale('en')}
          lang="en"
          title="Switch to English"
          aria-label="Switch to English"
        >
          EN
        </StyledLink>{' '}
        |{' '}
        <StyledLink
          as="button"
          onClick={() => switchLocale('fr')}
          lang="fr"
          title="Passer en français"
          aria-label="Passer en français"
        >
          FR
        </StyledLink>
      </p>
    </Container>
  );
};
