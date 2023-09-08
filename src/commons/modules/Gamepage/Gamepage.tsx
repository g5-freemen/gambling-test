import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectGames } from '../../redux/reducers/globalReducer';
import Button from '../../components/Button/Button';
import css from './Gamepage.module.css';

export default function Gamepage() {
  const navigate = useNavigate();
  const { provider, gameName } = useParams();
  const games = useSelector(selectGames);
  const game = games?.[`${provider}/${gameName}`];

  return (
    <div className={css.wrapper}>
      <Button onClick={() => navigate('/')} className={css.homeBtn}>
        На главную
      </Button>
      <div className={css.provider}>{provider}</div>
      <h1>{game?.title || gameName}</h1>
    </div>
  );
}
