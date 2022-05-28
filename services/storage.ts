import set from 'lodash/set';
import ShortUniqueId from 'short-unique-id';
import { GarbtrackStorage } from './type';

const LOCAL_STORAGE_KEY = 'garbtrackData';

let uidGenerator: ShortUniqueId | null = null;

export const getUid = () => {
  if (uidGenerator === null) {
    uidGenerator = new ShortUniqueId({ length: 8 });
  }

  return uidGenerator() as string;
};

export const getStorage = (): GarbtrackStorage => {
  try {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}') as GarbtrackStorage;

    return storage;
    // eslint-disable-next-line
  } catch {}

  return {};
};

export const setValue = (key: string, value: unknown) => {
  const storage = getStorage();

  const newStorage = set(storage, key, value);

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStorage));
    // eslint-disable-next-line
  } catch {}
};
