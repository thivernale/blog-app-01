import { ForwardedRef, forwardRef, InputHTMLAttributes, useId } from 'react';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { type = 'text', label, className = '', ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 inline-block pl-1"
          data-testid={'label-' + type}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none focus:bg-gray-50 ${className}`}
        {...props}
        data-testid={'input-' + type}
      />
    </div>
  );
});
