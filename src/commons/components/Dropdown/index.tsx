import React from 'react';
import Button from '../Button/Button';
import clsx from 'clsx';
import { HTMLAttributes, ReactNode, useState } from 'react';
import css from './style.module.css';

export type Option = { label: string; value: string };

interface Props extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  children?: ReactNode;
  options?: Option[];
  onOptionSelect?: (option: Option) => void;
  value?: string;
}

const Dropdown = ({ children, options, onOptionSelect, value }: Props) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <div className={clsx(css.dropdown)}>
      <button onClick={() => setMenuVisible((prev) => !prev)} className={css.button}>
        {children}
        <div className={css.arrow}>{menuVisible ? '▼' : '▲'}</div>
      </button>

      {menuVisible && options?.length ? (
        <ul className={css.dropdownMenu}>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onOptionSelect?.(opt);
                setMenuVisible(false);
              }}
            >
              <span
                className={clsx(
                  css.dropdownMenuItem,
                  value && opt.value === value && css.dropdownMenuItemActive,
                )}
              >
                {opt.label}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
