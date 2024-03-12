import { addNewComment } from "./createNewComment.js";
import { getSubmittedComments} from "./commentsView.js"


export async function showDetails(event) {
    console.log("mistake");
    document.getElementsByClassName("new-topic-border")[0].style.display = "none";
    document.getElementsByClassName("topic-container")[0].style.display = "none";
    let idCurrent = event.target.parentElement.dataset.id;
    document.getElementById("comments").querySelector('form').addEventListener('submit',(event) =>{
        addNewComment(event,idCurrent)}
        );

    getCurrentPostData(event.target.parentElement.dataset.id)
    async function getCurrentPostData(id) {
        await fetch('http://localhost:3030/jsonstore/collections/myboard/posts' + '/' + id)
            .then(onHeaders)
            .then(onSuccess)
    }
    function onHeaders(response) {
        if (!response.ok) {
            throw new Error;
        }
        return response.json();

    }
    function onSuccess(data) {

        let themeContent = document.getElementsByClassName("theme-content")[0]
        themeContent.removeAttribute("style");
        let header = themeContent.querySelector('h2');
        header.textContent = data.title
        let themeDetails = document.getElementsByClassName("comment")[0];
        themeDetails.innerHTML = "";
        themeDetails.innerHTML += ` <div class="header">
    <img src="./static/profile.png" alt="avatar">
    <p><span>${data.username}</span> posted on <time>${data.date}</time></p>

    <p class="post-content">${data.content}</p>
</div>
    `
    }
    getSubmittedComments(event.target.parentElement.dataset.id)

}




