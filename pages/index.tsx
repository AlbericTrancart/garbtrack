import { Button } from 'components/Button/Button';
import { NextPage } from 'next';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getStorage } from 'services/storage';
import styled from 'styled-components';

enum Steps {
  START,
  BALANCE,
  TRACK,
}

const Container = styled.section`
  text-align: center;
  font-size: 1.25rem;
`;

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

          <Button className="mtop" onClick={() => setStep(Steps.BALANCE)}>
            <FormattedMessage id="pages.home.startOk" />
          </Button>
        </>
      )}
      {step === Steps.BALANCE && (
        <>
          <p>
            <FormattedMessage id="pages.home.scale" />
            <br />
            <br />
            <strong>
              <FormattedMessage id="pages.home.scaleWarning1" />
            </strong>
            <br />
            <FormattedMessage id="pages.home.scaleWarning2" />
          </p>

          <Button className="mtop" onClick={() => setStep(Steps.TRACK)}>
            <FormattedMessage id="pages.home.scaleOk" />
          </Button>
        </>
      )}
      {step === Steps.TRACK && (
        <>
          <form>
            <div>
              <label htmlFor="">
                <FormattedMessage id="pages.home.track" />
              </label>
            </div>

            <Button type="submit" className="mtop">
              <FormattedMessage id="pages.home.trackOk" />
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default Home;
