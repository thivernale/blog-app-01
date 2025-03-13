import { useId, useState } from 'react';
import { useCurrencyInfo } from '../hooks/useCurrencyInfo';

type Props = {
  label?: string,
  amount?: number,
  onAmountChange?: (e: number) => void,
  onCurrencyChange?: (e: string) => void,
  currencyOptions: string[],
  selectedCurrency?: string,
  amountReadonly?: boolean,
  currencyReadonly?: boolean,
  className?: string
};

function CurrencyInputBox(
  {
    label,
    amount = 0,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = 'usd',
    amountReadonly = false,
    currencyReadonly = false,
    className = '',
  }: Props) {

  const amountId = useId();
  const currencyId = useId();

  return (
    <div className={`bg-white dark:bg-gray-800 p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label className="text-black/40 dark:text-gray-400 mb-2 inline-block" htmlFor={amountId}>{label}</label>
        <input
          type="number"
          name="amount"
          id={amountId}
          value={amount}
          disabled={amountReadonly}
          onChange={e => onAmountChange && onAmountChange(Number(e.target.value))}
          className="outline-none w-full bg-transparent py-1.5"
          autoComplete="off"
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <label className="text-black/40 dark:text-gray-400 mb-2 w-full" htmlFor={currencyId}>Currency Type</label>
        <select
          name="currency"
          id={currencyId}
          value={selectedCurrency}
          disabled={currencyReadonly}
          onChange={e => onCurrencyChange && onCurrencyChange(e.target.value)}
          className="rounded-lg px-1 py-1 bg-gray-100 dark:bg-gray-800 cursor-pointer outline-none"
        >
          {currencyOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function CurrencyConverter() {

  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('usd');
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const currencyOptions = Object.keys(currencyInfo);

  function convert() {
    setToAmount(fromAmount * (from === to ? 1 : currencyInfo[to]));
  }

  function swap() {
    setFrom(to);
    setTo(from);
    setFromAmount(() => toAmount);
    setToAmount(() => fromAmount);
  }

  return (
    <div
      className="w-full grow flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/6120216/pexels-photo-6120216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
      }}
    >
      <div className="w-full">
        <div
          className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30"
        >
          <form
            onSubmit={e => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <CurrencyInputBox
                label={'From'}
                amount={fromAmount}
                currencyOptions={currencyOptions}
                selectedCurrency={from}
                onCurrencyChange={setFrom}
                onAmountChange={setFromAmount}
              />
            </div>
            <div className="w-full relative h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md text-white bg-blue-600 px-2 py-0.5"
                onClick={() => swap()}
                type="button"
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <CurrencyInputBox
                label={'To'}
                amount={toAmount}
                currencyOptions={currencyOptions}
                selectedCurrency={to}
                onCurrencyChange={setTo}
                onAmountChange={setToAmount}
                amountReadonly={true}
              />
            </div>
            <button
              className="w-full rounded-lg text-white bg-blue-600 px-4 py-3"
              onClick={() => convert()}
            >
              Convert from {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
