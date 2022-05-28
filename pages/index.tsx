import { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';

const Home: NextPage = () => (
  <>
    <section>
      <p>
        <FormattedMessage id="pages.home.introduction" />
      </p>
    </section>
  </>
);

export default Home;
