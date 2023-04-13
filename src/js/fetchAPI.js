import axios from "axios";

const API_KEY = "193148fb3e296bb7bc40d2f930865e2a";
const baseUrl = "https://api.themoviedb.org/3/";

// запрос трендовых фильмов дня для рендера на главную страницу
export async function fetchDefaultMovies(pageNumber) {
    try {
        return await axios.get(`${baseUrl}trending/all/day?api_key=${API_KEY}&page=${pageNumber}`);                                 
    } catch (error) {
        console.error(error);
    }
}