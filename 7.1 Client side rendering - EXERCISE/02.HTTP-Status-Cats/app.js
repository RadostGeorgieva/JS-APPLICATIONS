import { cats } from "./catSeeder.js";
import{render,html} from './node_modules/lit-html/lit-html.js'

let root = document.getElementById("allCats");
root.addEventListener("click", onClick)
let inputCats  = (cats) => html`
 <ul>${cats.map((cat) => html`
            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id="304">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
            `
 )}
</ul>
`

render(inputCats(cats), root);
function onClick(event) {

    if (event.target.classList.contains("showBtn")) {
        if (event.target.parentElement.querySelector(".status").style.display == "block") {

            event.target.parentElement.querySelector(".status").style.display = "none";
            event.target.textContent = "Show status code"
        } else {

            event.target.parentElement.querySelector(".status").style.display = "block";
            event.target.textContent = "Hide status code"
        }

    }
}
