import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Homepage from './commons/modules/Homepage/Homepage';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from 'react-query';
import { fetchGames } from './commons/utils/httpServices/fetchServices';
import { Game } from './commons/redux/reducers/types';
import { setCurrencies, setGames, setProviders } from './commons/redux/reducers/globalReducer';
import { useDispatch } from 'react-redux';
import Gamepage from './commons/modules/Gamepage/Gamepage';

export default function App() {
  const dispatch = useDispatch();

  const { isLoading } = useQuery(`fetchGames`, () => fetchGames(), {
    onSuccess: ({ data }) => {
      const array = Object.values(data) as Game[];
      const provs = [...new Set(array.map((item) => item.provider))].sort((a, b) =>
        a > b ? 0 : -1,
      );
      const provsArr = [
        { label: 'Провайдер', value: null },
        ...provs.map((item) => ({ label: item, value: item })),
      ];
      const curs = [...new Set(array.flatMap((item) => Object.keys(item.real)))];
      const cursArr = [
        { label: 'Валюта', value: null },
        ...curs.map((item) => ({ label: item, value: item })),
      ];

      dispatch(setGames(data));
      dispatch(setProviders(provsArr));
      dispatch(setCurrencies(cursArr));
    },
  });

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/game/:provider/:gameName" element={<Gamepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
