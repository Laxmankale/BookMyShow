export interface Movie {
  id: number;
  name: string;
  image: string;
  description?: string;
  genre?: string;
  rating?: number;
  duration?: number;
  releaseDate?: string;
}