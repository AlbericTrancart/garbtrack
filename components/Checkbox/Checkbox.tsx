import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { borderRadius, colorPalette } from 'stylesheet';

export const Label = styled.label``;

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CHECK_SIZE = '2rem';

const Container = styled(CustomCheckboxContainer)`
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

  &[data-reach-custom-checkbox-container] {
    border: 2px solid ${colorPalette.lightGrey};
    cursor: pointer;
    vertical-align: middle;
    width: ${CHECK_SIZE};
    height: ${CHECK_SIZE};
    border-radius: ${borderRadius};
  }
`;

const Input = styled(CustomCheckboxInput)<{ checked: boolean }>``;

const Check = styled.span<{ checked: boolean }>`
  display: block;
  position: absolute;
  width: calc(${CHECK_SIZE} - 3px);
  height: calc(${CHECK_SIZE} - 3px);
  top: 0;
  left: 0;
  border-radius: ${borderRadius};
  background: ${({ checked }) =>
    checked
      ? `linear-gradient(to right, ${colorPalette.darkPurple}, ${colorPalette.darkFushia})`
      : colorPalette.white};
`;

export const Checkbox: React.FC<Props> = ({ checked, onChange }) => (
  <Container
    checked={checked}
    onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
  >
    <Input checked={checked} /> <Check aria-hidden checked={checked} />
  </Container>
);
