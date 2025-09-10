import type { QRL } from "@qwik.dev/core";

export interface CounterProps {
  label: string;
  onClick$?: QRL<() => void>;
  state: CounterStore;
}

export type CounterStore = { counter: number; increment: QRL<(this: CounterStore) => void> };