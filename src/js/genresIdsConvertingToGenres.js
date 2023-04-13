import { genresIds } from "../data/genres.js";

export const genresIdsConvertingToGenres = (genresIdsArray) => {
    const eachMovieGenresArray = [];
      
    genresIdsArray.map(genreId => {
      genresIds.map(genre => {
          if (genreId === genre.id) {
              eachMovieGenresArray.push(genre.name);
          } 
      });
    });
    return eachMovieGenresArray.join(', ');
};