import { get } from "./requester.js";
const baseUrL = "http://localhost:3030/";
const endPoints = {
    catalog:"data/movies"
}

async function getAllMovies() {
    return await get(baseUrL + endPoints.catalog);
}
export {
    getAllMovies
}