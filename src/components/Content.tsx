import '../styles/content.scss';

import { api          } from '../services/api';

import { Header       } from './Header';
import { MovieCard    } from '../components/MovieCard';

import { MovieContext } from '../contexts/MovieContext';

import { useContext,
         useEffect, 
         useState     } from "react";


type MovieProps = {
  imdbID   : string;
  Title    : string;
  Poster   : string;
  Ratings  : Array<{
    Source : string;
    Value  : string;
  }>;
  Runtime  : string;
}

export function Content() {
  const [ movies, setMovies              ] = useState<MovieProps[]>([]);
  const { selectedGenreId, selectedGenre } = useContext(MovieContext)

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return(
    <div className="container">
      <Header/>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            
            <MovieCard key     = {movie.imdbID} 
                       title   = {movie.Title} 
                       poster  = {movie.Poster} 
                       runtime = {movie.Runtime} 
                       rating  = {movie.Ratings[0].Value} 
            />
          ))}
        </div>
      </main>
  </div>
  )
}