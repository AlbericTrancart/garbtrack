export interface GarbageTrackingEntry {
  id: string;
  weight: string;
  date: string;
  recyclable: boolean;
}

export interface GarbtrackStorage {
  entries?: GarbageTrackingEntry[];
}
