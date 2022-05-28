import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { colorPalette, getSpacing, typography } from 'stylesheet';
import { PAGES } from 'services/pages';
import { FormattedMessage } from 'react-intl';

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colorPalette.darkPurple}; /* fallback for old browsers */
  background: linear-gradient(to right, ${colorPalette.darkPurple}, ${colorPalette.darkFushia});

  color: ${colorPalette.white};
  padding: ${getSpacing(3)} ${getSpacing(2)};
  margin-bottom: ${getSpacing(2)};
`;

const HomeLink = styled.a`
  display: flex;
  flex-direction: column;
  text-align: center;
  font: inherit;
  color: inherit;
  text-decoration: none;

  &:focus {
    outline-color: ${colorPalette.white};
  }
`;

const Title = styled.span`
  ${typography.title}
`;

const Logo = styled.img`
  height: 4rem;
  max-width: 100%;
`;

const Description = styled.p`
  ${typography.subtitle}
  text-align: center;
`;

interface Props {
  isHomepage: boolean;
}

export const Header: React.FC<Props> = ({ isHomepage }) => (
  <Container>
    <Title>
      <Link href={PAGES.Home.url()} passHref>
        <HomeLink aria-label="Homepage, Garbtrack">
          <Logo alt="Garbtrack logo" src="/logo-white.svg" />
        </HomeLink>
      </Link>
    </Title>

    <Description as={isHomepage ? 'h1' : 'p'}>
      <FormattedMessage id="header.slogan" />
    </Description>
  </Container>
);
