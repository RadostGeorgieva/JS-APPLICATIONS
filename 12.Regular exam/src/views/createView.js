import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";
import { notify } from "./notification.js";

const createViewTemp = (error)=> html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
          <div class="form form-item">
            <h2>Share Your item</h2>
            <form @submit=${onSubmit} class="create-form">
              <input type="text" name="item" id="item" placeholder="Item" />
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
            </form>
          </div>
        </section>
        `


let context = null;
export function showCreateView(ctx) {
    context = ctx;
    context.render(createViewTemp());

}

async function onSubmit (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let {item,imageUrl,price,availability,type,description} = Object.fromEntries(formData);

    if(!item || !imageUrl ||!price||!availability||!type ||!description) { 
      notify("All fields are mandatory")
      document.querySelector(`.notification`).style.display = "block"
        return
    }

     context.render(createViewTemp());
    

    await dataService.createItem({item,imageUrl,price,availability,type,description})
    context.goTo("/catalog") 
}