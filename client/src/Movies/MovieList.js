import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import AddMovie from "../AddMovie";

function MovieList({ movies }) {
  console.log('array of movies', movies)
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
          
        ))
      }

    </div>
  );
}

export default MovieList;
