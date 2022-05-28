import styled, { StyledComponentProps } from 'styled-components';
import { borderRadius, colorPalette, getSpacing } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  align-items: center;

  /* Gradient-border */
  position: relative;
  background-clip: padding-box;
  border: solid 4px transparent;
  border-radius: ${borderRadius};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -4px;
    border-radius: inherit;
    background: none;
  }
  &:focus-within {
    &:before {
      background: linear-gradient(to right, ${colorPalette.darkPurple}, ${colorPalette.darkFushia});
    }
  }
`;

const BaseInput = styled.input`
  width: 100%;
  padding: ${getSpacing(2)};
  border: 3px solid ${colorPalette.lightGrey};
  border-radius: 7px;
  font-size: 1.25rem;

  &::placeholder {
    font-size: 1.25rem;
  }

  &:focus {
    outline: none;
    border-color: transparent;
  }
`;

// eslint-disable-next-line
export const Input: React.FC<StyledComponentProps<'input', any, {}, never>> = ({
  className,
  ...rest
}) => (
  <Container className={className}>
    <BaseInput {...rest} />
  </Container>
);
