import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  bgColor?: string;
  textColor?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      type={type}
      className={`rounded-lg px-4 py-2 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
