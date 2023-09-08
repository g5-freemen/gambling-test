import React from 'react';
import { Game } from '../../redux/reducers/types';
import css from './index.module.css';

interface Props extends Game {
  id: string;
  onClick: () => void;
}

export default function GameCard({ title, id, onClick }: Props) {
  return (
    <div className={css.wrapper} onClick={onClick}>
      <div
        className={css.container}
        style={{ backgroundImage: `url(https://cdn2.softswiss.net/i/s2/${id}.png)` }}
      />
      <p>{title}</p>
    </div>
  );
}
