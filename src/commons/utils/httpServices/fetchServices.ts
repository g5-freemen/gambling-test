import { apiUrl } from '../constants';
import games from '../../../data/games.json';

export async function fetchGames() {
  try {
    const response = await fetch(`${apiUrl}/games/allowed_desktop`);
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log(error);
    return { data: games };
  }
}
