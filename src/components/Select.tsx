import { ForwardedRef, forwardRef, SelectHTMLAttributes, useId } from 'react';

type Props = {
  label?: string;
  options: string[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { options = [], label, className = '', ...props }: Props,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 inline-block pl-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none focus:bg-gray-50 ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={option + index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});
