import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { ChangeEventHandler } from 'react';
import { expect, test } from 'vitest';

test('Test Input', () => {
  function generatorOnChange(): ChangeEventHandler | undefined {
    return; //TODO return stub object
  }

  render(
    <Input
      onChange={generatorOnChange()}
      type={'text'}
      value={'hello'}
      label="Greeting"
    />,
  );

  expect(screen.getByTestId('label-text')).toBeVisible();
  expect(screen.getByTestId('label-text')).toHaveTextContent('Greeting');
  expect(screen.getByTestId('input-text')).toBeVisible();
  expect(screen.getByTestId('input-text')).toHaveValue('hello');
});
