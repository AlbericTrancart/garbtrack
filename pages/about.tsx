import { Subtitle } from 'components/Layout/Layout';
import { Link } from 'components/Link/Link';
import { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';

const About: NextPage = () => (
  <>
    <section>
      <Subtitle>
        <FormattedMessage id="pages.about.whyTitle" />
      </Subtitle>

      <p>
        <FormattedMessage id="pages.about.whyContent" />
      </p>
    </section>

    <section>
      <Subtitle>
        <FormattedMessage id="pages.about.dataPolicyTitle" />
      </Subtitle>

      <p>
        <FormattedMessage id="pages.about.dataPolicyContent" />
      </p>
    </section>

    <section>
      <Subtitle>
        <FormattedMessage id="pages.about.contactTitle" />
      </Subtitle>
      <p>
        <FormattedMessage id="pages.about.contactContent" />
      </p>
      <ul>
        <li>
          <Link
            as="a"
            target="_blank"
            rel="noreferrer noopener"
            href="https://twitter.com/alberictrancart"
          >
            <FormattedMessage id="pages.about.contactLinks.twitter" />
          </Link>
        </li>
        <li>
          <Link
            as="a"
            target="_blank"
            rel="noreferrer noopener"
            href="mailto:garbtrackearth@gmail.com"
          >
            <FormattedMessage id="pages.about.contactLinks.email" />
          </Link>
        </li>
        <li>
          <Link
            as="a"
            target="_blank"
            rel="noreferrer noopener"
            href="https://alberic.trancart.net/"
          >
            <FormattedMessage id="pages.about.contactLinks.website" />
          </Link>
        </li>
      </ul>
    </section>
  </>
);

export default About;
