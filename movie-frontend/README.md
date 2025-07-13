# Movie Frontend

A responsive React application built with TypeScript and Tailwind CSS that displays movies fetched from a backend API.

## Features

- **Responsive Grid Layout**: Adapts to different screen sizes with responsive breakpoints
- **Movie Cards**: Display movie information including name, image, genre, rating, and duration
- **API Integration**: Fetches movie data from `http://localhost:8080/api/movies`
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Graceful error handling with retry functionality
- **Modern UI**: Clean, modern design using Tailwind CSS
- **TypeScript**: Full TypeScript support for type safety

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Requirements

The backend API should provide a `/api/movies` endpoint that returns an array of movie objects with the following structure:

```json
[
  {
    "id": 1,
    "name": "Movie Title",
    "image": "https://example.com/image.jpg",
    "description": "Movie description",
    "genre": "Action",
    "rating": 8.5,
    "duration": 120,
    "releaseDate": "2023-01-01"
  }
]
```

## Responsive Breakpoints

- **Mobile**: 1 column (default)
- **Small**: 2 columns (sm:grid-cols-2)
- **Medium**: 3 columns (md:grid-cols-3)
- **Large**: 4 columns (lg:grid-cols-4)
- **Extra Large**: 5 columns (xl:grid-cols-5)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── MovieCard.tsx      # Individual movie card component
│   └── MovieList.tsx      # Movie grid container component
├── services/
│   └── movieService.ts    # API service for movie data
├── types/
│   └── Movie.ts          # TypeScript interfaces
├── App.tsx               # Main app component
└── index.css            # Tailwind CSS styles
```

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Fetch API** for HTTP requests
- **Create React App** for bootstrapping

## Notes

- The application includes fallback images for broken image URLs
- Error states include retry functionality
- The "View Details" button currently logs to console (can be extended for navigation)
- All components are fully typed with TypeScript interfaces
