import {html, render} from './node_modules/lit-html/lit-html.js';
async function addItem() {
    const menu = document.getElementById("menu");
    const options = await gettingAllItems();
    let addingItem = (item) => html`<option value=${item._id}>${item.text}</option>`

    render(options.map(addingItem),menu)
}
async function gettingAllItems () {
    
    let req = await fetch("http://localhost:3030/jsonstore/advanced/dropdown");
    let options = await req.json();
    return Object.values(options);
}
async function postData(element) {
    let post = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"text":element}) 
    })
}

addItem()
document.querySelector("form").addEventListener("submit",onSubmit);

async function onSubmit(event) {
event.preventDefault();
let data =document.getElementById("itemText");
await postData(data.value);
data.value = "";
addItem()
}