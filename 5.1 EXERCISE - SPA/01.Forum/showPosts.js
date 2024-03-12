import { showDetails } from "./detailsView.js";

document.getElementsByClassName("theme-content")[0].style.display = "none"
document.querySelector("nav a").addEventListener("click",  showPosts)


export async function showPosts(event) {
event?.preventDefault();
console.log("show posts");
await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
.then(onHeaders)
.then(onSuccess)

function onHeaders(response){
    if(!response.ok){
        throw new Error;
    }
    return response.json();

}
function onSuccess(data){
    document.getElementsByClassName("topic-container")[0].innerHTML = "";
    document.getElementsByClassName("theme-content")[0].style.display = "none"
    document.getElementsByClassName("new-topic-border")[0].removeAttribute("style")
    document.getElementsByClassName("topic-container")[0].removeAttribute("style")

    Object.values(data).forEach(element => {
 
        let div = document.createElement("div");
        div.classList.add("topic-title");
        div.innerHTML+=` <div class="topic-container">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="#" class="normal" data-id = "${element._id}">
                    <h2>${element.title}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${element.date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${element.username}</span></p>
                        </div>
                    </div>


                </div>
            </div>
        </div>`
        document.getElementsByClassName("topic-container")[0].appendChild(div)
        div.querySelector("a")?.addEventListener("click",showDetails);
      });

}
}
