import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";
import { notify } from "./notification.js";
const editTemp = (item)=> html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
          <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input type="text" name="item" id="item" placeholder="Item" .value = "${item.item}"/>
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
                .value = "${item.imageUrl}"

              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value = "${item.price}"
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
                .value = "${item.availability}"
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
                .value = "${item.type}"
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                .value = "${item.description}"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>

`


let context = null;
let id =null;
let itemId = null;
export async function showEditView(ctx) {
    context = ctx;
    id = context.params.id
    const item = await dataService.getItemDetails(id);
    context.render(editTemp(item));
    itemId = item._id
    

}

async function onSubmit (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let {item,imageUrl,price,availability,type,description} = Object.fromEntries(formData);

    const itemEdited = {item,imageUrl,price,availability,type,description}
    if(!item || !imageUrl ||!price||!availability||!type ||!description) { 
        notify("All fields are mandatory")
        document.querySelector(`.notification`).style.display = "block"
        return
      } else {
        context.render(editTemp(itemEdited));
      }


    await dataService.updateItem(id,itemEdited)
    context.goTo(`/catalog/${itemId}`)

}