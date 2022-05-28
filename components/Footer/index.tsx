import React from 'react';
import styled from 'styled-components';
import { Divider } from 'components/Divider';
import { Link } from 'components/Link';
import { PAGE_WIDTH } from 'components/Layout';
import { getSpacing, typography } from 'stylesheet';

const Container = styled.footer`
  max-width: ${PAGE_WIDTH};
  margin: 0 auto;
  padding: 0 ${getSpacing(2)} ${getSpacing(4)} ${getSpacing(2)};
  text-decoration: italic;
  text-align: center;
  ${typography.small}
`;

export const Footer: React.FC = () => (
  <Container>
    <Divider />
    <Link as="a" target="_blank" rel="noreferrer noopener" href="https://alberic.trancart.net/">
      About me
    </Link>{' '}
    |{' '}
    <Link
      as="a"
      target="_blank"
      rel="noreferrer noopener"
      href="https://twitter.com/alberictrancart"
    >
      Contact me on Twitter
    </Link>{' '}
    or{' '}
    <Link as="a" target="_blank" rel="noreferrer noopener" href="mailto:garbtrack@gmail.com">
      email me at garbtrack@gmail.com
    </Link>
  </Container>
);
