import { Button } from 'components/Button/Button';
import { Input } from 'components/Input/Input';
import { NextPage } from 'next';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getStorage } from 'services/storage';
import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

enum Steps {
  START,
  BALANCE,
  TRACK,
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${getSpacing(4)};
  font-size: 1.25rem;
`;

const StyledInput = styled(Input)``;

const Home: NextPage = () => {
  const storage = getStorage();
  const initialStep =
    storage.entries !== undefined && storage.entries?.length > 0 ? Steps.TRACK : Steps.START;
  const [step, setStep] = useState(initialStep);

  return (
    <Container>
      {step === Steps.START && (
        <>
          <p>
            <FormattedMessage id="pages.home.start" />
          </p>

          <Button onClick={() => setStep(Steps.BALANCE)}>
            <FormattedMessage id="pages.home.startOk" />
          </Button>
        </>
      )}
      {step === Steps.BALANCE && (
        <>
          <p>
            <FormattedMessage id="pages.home.scale" />
          </p>
          <p>
            <strong>
              <FormattedMessage id="pages.home.scaleWarning1" />
            </strong>
            <br />
            <FormattedMessage id="pages.home.scaleWarning2" />
          </p>

          <Button onClick={() => setStep(Steps.TRACK)}>
            <FormattedMessage id="pages.home.scaleOk" />
          </Button>
        </>
      )}
      {step === Steps.TRACK && (
        <>
          <Container as="form">
            <div>
              <label htmlFor="weight">
                <FormattedMessage id="pages.home.track" />
              </label>
            </div>

            <StyledInput type="number" placeholder="13.2" id="weight" required />

            <Button type="submit">
              <FormattedMessage id="pages.home.trackOk" />
            </Button>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Home;
