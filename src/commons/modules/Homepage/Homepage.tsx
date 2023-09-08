import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import { selectCurrencies, selectGames, selectProviders } from '../../redux/reducers/globalReducer';
import { Game } from '../../redux/reducers/types';
import GameCard from '../../components/GameCard';
import { ITEMS_LIMIT } from '../../utils/constants';
import css from './Homepage.module.css';

export default function Homepage() {
  const navigate = useNavigate();
  const games = useSelector(selectGames);
  const providers = useSelector(selectProviders);
  const currencies = useSelector(selectCurrencies);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(1);
  const buttonRef = useRef(null);

  const gamesArr = games && Object.keys(games)?.length && Object.entries(games);
  const filteredArr = gamesArr
    ? gamesArr
        .filter(([_, item]: [string, Game]) =>
          selectedProvider ? item.provider === selectedProvider : item.provider,
        )
        .filter(([_, item]: [string, Game]) =>
          selectedCurrency ? Object.keys(item.real).includes(selectedCurrency) : item.real,
        )
        .sort(([_, a1]: [string, Game], [__, b1]: [string, Game]) =>
          a1.collections.popularity > b1.collections.popularity ? 0 : -1,
        )
        .slice(0, showMore * ITEMS_LIMIT)
    : [];

  useEffect(() => {
    if (!buttonRef?.current) return;
    const el = buttonRef?.current as HTMLButtonElement;
    el.scrollIntoView({ behavior: 'smooth' });
  }, [showMore]);

  useEffect(() => {
    setShowMore(1);
  }, [selectedCurrency, selectedProvider]);

  return (
    <div className={css.container}>
      <div className={css.row}>
        <Dropdown options={providers} onOptionSelect={({ value }) => setSelectedProvider(value)}>
          {selectedProvider || providers?.[0]?.label}
        </Dropdown>
        <Dropdown options={currencies} onOptionSelect={({ value }) => setSelectedCurrency(value)}>
          {selectedCurrency || currencies?.[0]?.label}
        </Dropdown>
      </div>
      <div className={css.cards}>
        {filteredArr?.length ? (
          filteredArr.map(([key, item]: [string, Game]) => (
            <GameCard
              key={item.provider + item.title}
              id={key}
              {...item}
              onClick={() => navigate(`/game/${key}`)}
            />
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
      <button
        ref={buttonRef}
        className={css.showMoreButton}
        onClick={() => setShowMore((prev) => prev + 1)}
      >
        Показать ещё
      </button>
    </div>
  );
}
