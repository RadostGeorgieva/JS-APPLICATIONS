import { getAllMovies } from "./dataService.js";
import { getUserId } from "./userHelper.js";

export function showHome() {
    document.querySelectorAll("section").forEach(section => { section.style.display = "none"; })
    document.getElementById("home-page").style.display = "block";
    const userId= getUserId();
    if(userId) {
        showAddBtn();
    }
    showAllMovies (userId);
}
function showAddBtn() {
    document.getElementById("add-movie-button").style.display  = "block";
}
async function showAllMovies(userId) {
    const data = await getAllMovies()
}