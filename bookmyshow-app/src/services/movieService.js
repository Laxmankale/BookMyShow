// Mock data for demonstration
const movies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    genre: "Action, Adventure, Sci-Fi",
    rating: 8.4,
    duration: "2h 28m",
    language: "English",
    poster: "https://images.unsplash.com/photo-1635863138275-d9864d3dedc9?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1635863138275-d9864d3dedc9?w=1200&h=600&fit=crop",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    director: "Jon Watts",
    releaseDate: "2021-12-17",
    price: 250
  },
  {
    id: 2,
    title: "The Batman",
    genre: "Action, Crime, Drama",
    rating: 7.8,
    duration: "2h 56m",
    language: "English",
    poster: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=1200&h=600&fit=crop",
    description: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    director: "Matt Reeves",
    releaseDate: "2022-03-04",
    price: 300
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    genre: "Action, Drama",
    rating: 8.3,
    duration: "2h 11m",
    language: "English",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice.",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    director: "Joseph Kosinski",
    releaseDate: "2022-05-27",
    price: 280
  },
  {
    id: 4,
    title: "Doctor Strange 2",
    genre: "Action, Adventure, Fantasy",
    rating: 6.9,
    duration: "2h 6m",
    language: "English",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&h=600&fit=crop",
    description: "Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse, including alternate versions of himself, whose threat to humanity is too great for the combined forces of Strange, Wong, and Wanda Maximoff.",
    cast: ["Benedict Cumberbatch", "Elizabeth Olsen", "Chiwetel Ejiofor"],
    director: "Sam Raimi",
    releaseDate: "2022-05-06",
    price: 270
  }
];

const shows = [
  {
    id: 1,
    movieId: 1,
    cinema: "PVR Cinemas",
    time: "10:00 AM",
    date: "2024-01-15",
    price: 250,
    availableSeats: 120
  },
  {
    id: 2,
    movieId: 1,
    cinema: "INOX",
    time: "1:30 PM",
    date: "2024-01-15",
    price: 280,
    availableSeats: 85
  },
  {
    id: 3,
    movieId: 1,
    cinema: "Cinepolis",
    time: "6:00 PM",
    date: "2024-01-15",
    price: 320,
    availableSeats: 95
  },
  {
    id: 4,
    movieId: 2,
    cinema: "PVR Cinemas",
    time: "11:00 AM",
    date: "2024-01-15",
    price: 300,
    availableSeats: 110
  },
  {
    id: 5,
    movieId: 2,
    cinema: "INOX",
    time: "3:00 PM",
    date: "2024-01-15",
    price: 330,
    availableSeats: 75
  }
];

class MovieService {
  // Get all movies
  static getMovies() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(movies), 500);
    });
  }

  // Get movie by ID
  static getMovieById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const movie = movies.find(movie => movie.id === parseInt(id));
        if (movie) {
          resolve(movie);
        } else {
          reject(new Error('Movie not found'));
        }
      }, 300);
    });
  }

  // Search movies
  static searchMovies(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredMovies = movies.filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filteredMovies);
      }, 300);
    });
  }

  // Get shows for a movie
  static getShowsForMovie(movieId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const movieShows = shows.filter(show => show.movieId === parseInt(movieId));
        resolve(movieShows);
      }, 300);
    });
  }

  // Get show by ID
  static getShowById(showId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const show = shows.find(show => show.id === parseInt(showId));
        if (show) {
          const movie = movies.find(movie => movie.id === show.movieId);
          resolve({ ...show, movie });
        } else {
          reject(new Error('Show not found'));
        }
      }, 300);
    });
  }
}

export default MovieService;