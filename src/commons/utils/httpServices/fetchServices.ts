import { apiUrl } from '../constants';
import games from '../../../data/games.json';
import { toast } from 'react-toastify';

export async function fetchGames() {
  try {
    const response = await fetch(`${apiUrl}/games/allowed_desktop`);
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log(error);
    toast('An error occurred while fetching games', { type: 'error' });
    return { data: games };
  }
}
