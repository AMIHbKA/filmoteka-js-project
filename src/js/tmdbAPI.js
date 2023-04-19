import axios from 'axios';

export default class TmdbApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.cache = new Map();
    this.lastSearch = '';
    this.totalResults = 1;
  }

  #checkForHttpError(response, errorMessages) {
    const {
      status,
      data: { total_results },
    } = response;

    if (status === 400) {
      throw new Error(errorMessages[400]);
    } else if (status === 401) {
      throw new Error(errorMessages[401]);
    } else if (status === 404) {
      throw new Error(errorMessages[404]);
    } else if (total_results === 0) {
      throw new Error(errorMessages[200]);
    }
  }

  getTotalResults() {
    return this.totalResults;
  }

  async searchMovies(query, page = 1) {
    if (!query.trim()) {
      throw new Error('Unable to search for an empty string');
    }

    const cacheKey = `search-movies-${query}-${page}`;
    if (this.cache.has(cacheKey)) {
      this.totalResults = this.cache.get(`${cacheKey}-totalResults`);
      return this.cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${this.baseUrl}search/movie`, {
        params: { api_key: this.apiKey, query, page },
      });
      // console.log(response);
      this.#checkForHttpError(response, {
        400: `Bad request`,
        401: 'Unauthorized request',
        404: 'Search result not successful. Enter the correct movie name.',
        200: 'Sorry, there are no movies matching your search query. Try one more time, please.',
      });

      this.lastSearch = query;
      this.totalResults = response.data.total_results;
      this.cache.set(cacheKey, response.data);
      this.cache.set(`${cacheKey}-totalResults`, response.data.total_pages);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.error(error.message);
      throw new Error(error.message);
    }
  }

  async fetchTrendingMovies(page = 1) {
    const cacheKey = `trending-movies-${page}`;
    if (this.cache.has(cacheKey)) {
      this.totalResults = this.cache.get(`${cacheKey}-totalResults`);
      // console.log(`${cacheKey}-totalResults кеш есть`);
      return this.cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${this.baseUrl}trending/movie/day`, {
        params: { api_key: this.apiKey, page },
      });

      this.#checkForHttpError(response, {
        400: `Bad request`,
        401: 'Unauthorized request',
        404: 'Search result not successful. The resource you requested could not be found.',
      });

      this.totalResults = response.data.total_pages;
      this.cache.set(cacheKey, response.data);
      this.cache.set(`${cacheKey}-totalResults`, response.data.total_pages);
      // console.log(`${cacheKey}-totalResults добавлен`);
      // console.log(this.cache);
      // console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getTotalResults() {
    return this.totalResults;
  }

  async getMovieById(movieId, lng = 'en-US') {
    if (!movieId) {
      throw new Error('Unable to search movie without id');
    }

    const cacheKey = `movie-by-id-${movieId}`;
    if (this.cache.has(cacheKey)) {
      // console.log(`movie-by-id-${movieId} уже есть`);
      return this.cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${this.baseUrl}/movie/${movieId}`, {
        params: { api_key: this.apiKey, language: lng },
      });

      this.#checkForHttpError(response, {
        400: `Bad request`,
        401: 'Unauthorized request',
        404: 'Search result not successful. Enter the correct movie name.',
        200: 'Sorry, there are no movies matching your search query. Try one more time, please.',
      });

      this.totalResults = 1;
      this.cache.set(cacheKey, response.data);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.error(error.message);
      throw new Error(error.message);
    }
  }
}
