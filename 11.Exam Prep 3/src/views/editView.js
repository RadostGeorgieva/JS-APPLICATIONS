import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const editTemp = (item)=> html`
   <!-- Edit Page (Only for logged-in users) -->
   <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value = "${item.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value = "${item.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value = "${item.category}"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                .value = "${item.description}"
                rows="5"
                cols="50"
              ></textarea>

              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value = "${item.price}"
              />
              <button type="submit">post</button>
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
    let {name,imageUrl,category,description,price} = Object.fromEntries(formData);

    const itemEdited = {name,imageUrl,category,description,price}
    if(!name || !imageUrl ||!category||!description||!price) { 
        return window.alert ("All fields are mandatory")
      } else {
        context.render(editTemp(itemEdited));
      }


    await dataService.updateItem(id,itemEdited)
    context.goTo(`/catalog/${itemId}`)

}