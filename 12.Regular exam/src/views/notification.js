import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const root = document.querySelector("body");
const notificationTemplate = (message) => html`
           <!-- BONUS: Notification -->
      <div id="errorBox" class="notification">
        <span class="msg">${message}</span>
      </div>
        `

export function notify(message) {

    //document.querySelector(`.notification`).style.display = "block"
    console.log(message);
    const section = document.createElement("section");
    section.setAttribute("id", "notifications");
    render(notificationTemplate(message), section);
    root.appendChild(section)

    setTimeout(() => {
        section.remove();
    }, 3000);
}