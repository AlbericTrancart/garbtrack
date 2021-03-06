import React from 'react';
import BaseLink, { LinkProps } from 'next/link';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

export interface CustomLinkProps extends LinkProps {
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}

export const StyledLink = styled.a`
  cursor: pointer;
  transition: color ease 0.3s;
  text-decoration: underline;
  color: ${colorPalette.darkGrey};

  &:hover,
  &:focus,
  &:active {
    color: ${colorPalette.darkPurple};
  }

  &:focus {
    outline: ${colorPalette.darkPurple} solid 2px;
    outline-offset: 2px;
  }
`;

export const Link: React.FC<CustomLinkProps> = ({ href, children, ...rest }) => (
  <BaseLink href={href} passHref>
    {/* @ts-expect-error Too lazy to find the right type */}
    <StyledLink {...rest}>{children}</StyledLink>
  </BaseLink>
);
