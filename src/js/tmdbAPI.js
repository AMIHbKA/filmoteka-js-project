import axios from 'axios';

export default class TmdbApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.cache = new Map();
    this.lastSearch = '';
    this.totalPages = 0;
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
      return this.cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${this.baseUrl}search/movie`, {
        params: { api_key: this.apiKey, query, page },
      });

      if (response.status === 404) {
        throw new Error(
          'Search result not successful. Enter the correct movie name.'
        );
      }

      this.lastSearch = query;
      this.totalPages = response.data.total_pages;
      this.cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to get movies by search: ${error.message}`);
    }
  }
}
