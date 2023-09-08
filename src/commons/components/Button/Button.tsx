import React from 'react';
import css from './Button.module.css';
import clsx from 'clsx';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: IButton) {
  return (
    <button className={clsx(css.button, className)} {...rest}>
      {children}
    </button>
  );
}
