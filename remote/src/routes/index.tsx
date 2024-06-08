import { component$ } from '@builder.io/qwik';
import { Counter } from '~/components/Counter';

export default component$(() => {
  return (
    <>
      <h1>Remote 👋</h1>
      <Counter />
    </>
  );
});
