import { useEffect, useState } from 'react';

type CurrencyResponse = {
  date: string;
} & { [from: string]: CurrencyOptions };

type CurrencyOptions = { [to: string]: number };

export function useCurrencyInfo(from: string = 'usd'): CurrencyOptions {
  const [currencyOptions, setCurrencyOptions] = useState<CurrencyOptions>({});

  useEffect(() => {
    const url =
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json` as const;

    fetch(url)
      .then((response) => response.json())
      .then((response: CurrencyResponse) => setCurrencyOptions(response[from]));
  }, [from]);

  return currencyOptions;
}
