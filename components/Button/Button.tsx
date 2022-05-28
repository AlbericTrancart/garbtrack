import styled from 'styled-components';
import BaseLink from 'next/link';
import { borderRadius, colorPalette, getSpacing } from 'stylesheet';
import { CustomLinkProps } from 'components/Link/Link';

export const Button = styled.button`
  display: inline-block;
  padding: ${getSpacing(1)} ${getSpacing(2)};
  cursor: pointer;
  font: inherit;
  background: ${colorPalette.darkPurple}; /* fallback for old browsers */
  background: linear-gradient(to right, ${colorPalette.darkPurple}, ${colorPalette.darkFushia});
  border: none;
  border-radius: ${borderRadius};
  color: ${colorPalette.white};
  text-decoration: none;
  text-align: center;

  &:focus {
    outline: ${colorPalette.darkPurple} solid 2px;
    outline-offset: 2px;
  }
`;

export const Link: React.FC<CustomLinkProps> = ({ href, children, ...rest }) => (
  <BaseLink href={href} passHref>
    {/* @ts-expect-error Too lazy to find the right type */}
    <Button as="a" {...rest}>
      {children}
    </Button>
  </BaseLink>
);
