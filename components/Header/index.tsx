import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { colorPalette, getSpacing, typography } from 'stylesheet';
import { PAGES } from 'services/pages';

const Container = styled.header`
  background: ${colorPalette.darkPurple}; /* fallback for old browsers */
  background: linear-gradient(to right, ${colorPalette.darkPurple}, ${colorPalette.darkFushia});

  color: ${colorPalette.white};
  padding: ${getSpacing(3)} ${getSpacing(2)};
  margin-bottom: ${getSpacing(4)};
`;

const HomeLink = styled.a`
  display: flex;
  flex-direction: column;
  text-align: center;
  font: inherit;
  color: inherit;
  text-decoration: none;
`;

const Text = styled.p`
  margin: 0;
`;

const Title = styled.span`
  ${typography.title}
  margin: 0;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto;
  height: 4rem;
  max-width: 100%;
`;

const Description = styled.span`
  ${typography.subtitle}
  margin: 0;
`;

interface Props {
  isHomepage: boolean;
}

export const Header: React.FC<Props> = ({ isHomepage }) => (
  <Container>
    <Text as={isHomepage ? 'h1' : 'p'}>
      <Link href={PAGES.Home.url()} passHref>
        <HomeLink aria-label="Homepage, Garbtrack">
          <Title>
            <Logo alt="Garbtrack logo" src="logo-white.svg" />
          </Title>

          <Description>The simple waste tracker</Description>
        </HomeLink>
      </Link>
    </Text>
  </Container>
);
