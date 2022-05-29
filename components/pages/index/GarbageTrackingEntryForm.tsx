import { Button } from 'components/Button/Button';
import { Checkbox, Label } from 'components/Checkbox/Checkbox';
import { Input } from 'components/Input/Input';
import { MainPageContainer } from 'pages';
import { FormEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getStorage, getUid, setValue } from 'services/storage';
import { GarbageTrackingEntry } from 'services/type';

interface Props {
  onSubmit: (newEntries: GarbageTrackingEntry[]) => void;
}

export const GarbageTrackingEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [recyclable, setRecyclable] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storage = getStorage();
    const newEntries: GarbageTrackingEntry[] = [
      ...(storage.entries ?? []),
      {
        id: getUid(),
        weight,
        date: new Date().toISOString(),
        recyclable,
      },
    ];
    setValue('entries', newEntries);
    setWeight('');
    onSubmit(newEntries);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MainPageContainer>
        <div>
          <label htmlFor="weight">
            <FormattedMessage id="pages.home.form.weightLabel" />
          </label>
        </div>

        <Input
          id="weight"
          type="number"
          placeholder="13.2"
          required
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          // Disable changing input value on scroll over the input
          onWheel={(event) => event.currentTarget.blur()}
        />

        <Label>
          <Checkbox onChange={(value) => setRecyclable(value)} checked={recyclable} />
          <FormattedMessage id="pages.home.form.recyclableLabel" />
        </Label>

        <Button type="submit">
          <FormattedMessage id="pages.home.form.submit" />
        </Button>
      </MainPageContainer>
    </form>
  );
};
