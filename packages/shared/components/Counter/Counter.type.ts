import type { QRL } from "@builder.io/qwik";

export interface CounterProps {
  label: string;
  onClick$?: QRL<() => void>;
  state: CounterStore;
}

export type CounterStore = { counter: number; increment: QRL<(this: CounterStore) => void> };