import { Button } from 'components/Button/Button';
import { Input } from 'components/Input/Input';
import { MainPageContainer } from 'pages';
import { FormEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getStorage, getUid, setValue } from 'services/storage';
import { GarbageTrackingEntry } from 'services/type';

export const GarbageTrackingEntryForm: React.FC = () => {
  const [weight, setWeight] = useState('');
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storage = getStorage();
    const newEntries: GarbageTrackingEntry[] = [
      ...(storage.entries ?? []),
      {
        id: getUid(),
        weight,
        date: new Date().toISOString(),
        recyclable: false,
      },
    ];
    setValue('entries', newEntries);
    setWeight('');
  };

  return (
    <form onSubmit={onSubmit}>
      <MainPageContainer>
        <div>
          <label htmlFor="weight">
            <FormattedMessage id="pages.home.track" />
          </label>
        </div>

        <Input
          type="number"
          placeholder="13.2"
          id="weight"
          required
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />

        <Button type="submit">
          <FormattedMessage id="pages.home.trackOk" />
        </Button>
      </MainPageContainer>
    </form>
  );
};
