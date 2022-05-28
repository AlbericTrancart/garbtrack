import { Button } from 'components/Button/Button';
import { GarbageChart } from 'components/pages/index/GarbageChart';
import { GarbageTrackingEntryForm } from 'components/pages/index/GarbageTrackingEntryForm';
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

export const MainPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${getSpacing(4)};
  font-size: 1.25rem;
`;

const Home: NextPage = () => {
  const storage = getStorage();
  const initialEntries = storage.entries ?? [];
  const initialStep = initialEntries.length > 0 ? Steps.TRACK : Steps.START;
  const [trackingEntries, setTrackingEntries] = useState(initialEntries);
  const [step, setStep] = useState(initialStep);

  return (
    <MainPageContainer>
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
          <GarbageTrackingEntryForm onSubmit={(newEntries) => setTrackingEntries(newEntries)} />
          {trackingEntries.length > 0 && <GarbageChart trackingEntries={trackingEntries} />}
        </>
      )}
    </MainPageContainer>
  );
};

export default Home;
