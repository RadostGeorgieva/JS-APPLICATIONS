import { html, render } from './node_modules/lit-html/lit-html.js'

let root = document.getElementById("root");

document.querySelector(".content").addEventListener("submit", onClick);

function onClick(event) {

    event.preventDefault();

    let towns = document.getElementById("towns").value.split(", ");

    let ul = (towns) => html `<ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
    </ul>`;
    render(ul(towns),root);

}