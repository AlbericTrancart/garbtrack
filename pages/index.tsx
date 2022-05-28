import { Button } from 'components/Button';
import { NextPage } from 'next';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getStorage } from 'services/storage';

enum Steps {
  START,
  BALANCE,
  TRACK,
}

const Home: NextPage = () => {
  const storage = getStorage();
  const initialStep =
    storage.entries !== undefined && storage.entries?.length > 0 ? Steps.TRACK : Steps.START;
  const [step, setStep] = useState(initialStep);

  return (
    <>
      <section style={{ textAlign: 'center' }}>
        {step === Steps.START && (
          <>
            <p style={{ fontSize: '1.25rem' }}>
              <FormattedMessage id="pages.home.introduction" />
            </p>

            <Button className="mtop" onClick={() => setStep(Steps.BALANCE)}>
              <FormattedMessage id="pages.home.start" />
            </Button>
          </>
        )}
        {step === Steps.BALANCE && <>Test</>}
      </section>
    </>
  );
};

export default Home;
