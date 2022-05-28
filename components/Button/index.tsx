import styled from 'styled-components';
import BaseLink from 'next/link';
import { colorPalette, getSpacing } from 'stylesheet';
import { CustomLinkProps } from 'components/Link';

export const Button = styled.button`
  display: inline-block;
  padding: ${getSpacing(1)} ${getSpacing(2)};
  cursor: pointer;
  font: inherit;
  background: ${colorPalette.darkPurple}; /* fallback for old browsers */
  background: linear-gradient(to right, ${colorPalette.darkPurple}, ${colorPalette.darkFushia});
  border: none;
  border-radius: 10px;
  color: ${colorPalette.white};
  text-decoration: none;
  text-align: center;
`;

export const Link: React.FC<CustomLinkProps> = ({ href, children, ...rest }) => (
  <BaseLink href={href} passHref>
    {/* @ts-expect-error Too lazy to find the right type */}
    <Button as="a" {...rest}>
      {children}
    </Button>
  </BaseLink>
);
