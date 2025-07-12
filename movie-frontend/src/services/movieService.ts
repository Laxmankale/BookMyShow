import { Movie } from '../types/Movie';

const API_BASE_URL = 'http://localhost:8080/api';

export const movieService = {
  async getMovies(): Promise<Movie[]> {
    const response = await fetch(`${API_BASE_URL}/movies`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },

  async getMovie(id: number): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
};