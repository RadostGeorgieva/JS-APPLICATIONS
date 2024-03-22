import { html, render } from './node_modules/lit-html/lit-html.js'
import { contacts } from './contacts.js'

const divContacts = document.getElementById("contacts");
divContacts.addEventListener("click", onClick);
const card = (contact) => html`
<div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${contact.name}</h2>
                <button class="detailsBtn">Details</button>
                <div class="details" id=${contact.id}>
                    <p>Phone number: ${contact.phoneNumber}</p>
                    <p>Email: ${contact.email}</p>
                </div>
            </div>`;

render(contacts.map(card), divContacts)

function onClick(event) {

    if (event.target.classList.contains("detailsBtn")) {
        if (event.target.parentElement.querySelector(".details").style.display == "block") {

            event.target.parentElement.querySelector(".details").style.display = "none";
        } else {

            event.target.parentElement.querySelector(".details").style.display = "block";
        }

    }
}