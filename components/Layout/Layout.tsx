import styled from 'styled-components';
import { getSpacing, mobileBreakpoint, typography } from 'stylesheet';

export const PAGE_WIDTH = getSpacing(100);
export const MAIN_VERTICAL_MARGIN = getSpacing(2);
export const MAIN_VERTICAL_PADDING = getSpacing(2);

export const PageContainer = styled.main`
  max-width: ${PAGE_WIDTH};
  margin: ${MAIN_VERTICAL_MARGIN} auto;
  padding: ${MAIN_VERTICAL_PADDING};
  @media (min-width: ${mobileBreakpoint}) {
    margin-bottom: ${getSpacing(8)};
  }
`;

export const HoverAnchor = styled.a`
  visibility: hidden;
  float: left;
  text-decoration: none;

  /* Line-height is 1.5em so center this way */
  /* stylelint-disable-next-line */
  font-size: 0.7em;
  padding-top: 0.4em;
  padding-right: 0.2em;
  margin-left: calc(-0.2em - 2ch);
`;

export const Title = styled.h1`
  position: relative;
  ${typography.title}
  margin: 0;
`;

export const Subtitle = styled.h2`
  position: relative;
  ${typography.subtitle}
  margin: 0;
  margin-top: ${getSpacing(2)};
`;
