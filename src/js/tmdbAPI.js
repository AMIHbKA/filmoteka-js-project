import axios from 'axios';

export default class TmdbApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.cache = new Map();
    this.lastSearch = '';
    this.totalPages = 0;
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

  getTotalPages() {
    return this.totalPages;
  }

  async searchMovies(query, page = 1) {
    if (!query.trim()) {
      console.log('Unable to search for an empty string');
      return;
    }

    if (query === this.lastSearch) {
      return;
    }

    const cacheKey = `search-movies-${query}-${page}`;
    if (this.cache.has(cacheKey)) {
      this.totalPages = this.cache.get(`${cacheKey}-totalPages`);
      return this.cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${this.baseUrl}search/movie`, {
        params: { api_key: this.apiKey, query, page },
      });
      console.log(response);
      this.#checkForHttpError(response, {
        400: `Bad request`,
        401: 'Unauthorized request',
        404: 'Search result not successful. Enter the correct movie name.',
        200: 'Sorry, there are no movies matching your search query. Try one more time, please.',
      });

      this.lastSearch = query;
      this.totalPages = response.data.total_pages;
      this.cache.set(cacheKey, response.data);
      this.cache.set(`${cacheKey}-totalPages`, response.data.total_pages);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async fetchTrendingMovies(page = 1) {
    const cacheKey = `trending-movies-${page}`;
    if (this.cache.has(cacheKey)) {
      this.totalPages = this.cache.get(`${cacheKey}-totalPages`);
      return this.cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${this.baseUrl}trending/all/day`, {
        params: { api_key: this.apiKey, page },
      });

      this.#checkForHttpError(response, {
        400: `Bad request`,
        401: 'Unauthorized request',
        404: 'Search result not successful. The resource you requested could not be found.',
      });

      this.totalPages = response.data.total_pages;
      this.cache.set(cacheKey, response.data);
      this.cache.set(`${cacheKey}-totalPages`, response.data.total_pages);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
