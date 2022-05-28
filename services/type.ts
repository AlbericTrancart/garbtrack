export interface GarbageTrackingEntry {
  id: string;
  weight: number;
  date: string;
  recyclable: boolean;
}

export interface GarbtrackStorage {
  entries?: GarbageTrackingEntry[];
}
