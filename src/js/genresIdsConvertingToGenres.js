import { genresIds } from './data/genres';

//  rename => getGenresNamesById, genresIdsArray => ids etc

export const genresIdsConvertingToGenres = genresIdsArray => {
  const eachMovieGenresArray = [];
  // console.log('genresIdsArray', genresIdsArray);
  genresIdsArray.map(genreId => {
    // console.log('genreId', genreId);
    genresIds.map(genre => {
      // console.log('genre', genre);
      if (genreId === genre.id) {
        eachMovieGenresArray.push(genre.name);
      } else if (typeof genreId === 'object' && genreId != null) {
        //детально по фильму приходит массив объектов
        if (genreId.id === genre.id) {
          eachMovieGenresArray.push(genre.name);
        }
      }
    });
  });
  return eachMovieGenresArray.join(', ');
};
