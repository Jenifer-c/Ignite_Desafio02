import { useContext   } from "react"
import { MovieContext } from "../contexts/MovieContext"

export function Header() {
    const {selectedGenre} = useContext(MovieContext)
    
    return(
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>
    )
}