import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from '../services/api';

type GenreResponseProps = {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }

type MovieContextType = {
    genres: Array<GenreResponseProps>;
    setGenres: Object;
    selectedGenreId: number;
    setSelectedGenreId: Object;
    selectedGenre: GenreResponseProps;
    setSelectedGenre: Object;
    handleClickButton:(id: number) => void
  }

type MovieContextProviderProps = {
    children: ReactNode;
}


export const MovieContext = createContext({} as MovieContextType);

export function MovieContextProvider( props: MovieContextProviderProps ) {

    const [ selectedGenreId , setSelectedGenreId ] = useState(1);
    const [ genres          , setGenres          ] = useState<GenreResponseProps[]>([]);
    const [ selectedGenre   , setSelectedGenre   ] = useState<GenreResponseProps>({} as GenreResponseProps);
  
    useEffect(() => {
      api.get<GenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
      });
    }, []);
  
    useEffect(() => {
      api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
        console.log(response.data)
        
      })
    }, [selectedGenreId]);
  
    function handleClickButton(id: number) {
      setSelectedGenreId(id); 
    }
  

    return(
        <MovieContext.Provider value={{
            selectedGenreId,
            genres,
            selectedGenre,
            setSelectedGenre,
            setGenres,
            setSelectedGenreId,
            handleClickButton
        }}>
            { props.children }
        </MovieContext.Provider>
    );
}