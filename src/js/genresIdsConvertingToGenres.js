import { genresIds } from './data/genres';

//  rename => getGenresNamesById, genresIdsArray => ids etc

export const genresIdsConvertingToGenres = genresIdsArray => {
  const eachMovieGenresArray = [];

  genresIdsArray.map(genreId => {
    genresIds.map(genre => {
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

// // genresIds => genres
// export const getGenresNamesById = (ids, genresArray = genresIds) => {
//   const genreNames = [];
//   ids.forEach(id => {
//     const genre = genresArray.find(genre => genre.id === id);
//     if (genre) {
//       genreNames.push(genre.name);
//     }
//   });
//   return genreNames.join(', ');
// };
