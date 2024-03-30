import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const editTemp = (item)=> html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form @submit=${onSubmit} class="edit-form">
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  .value = ${item.model}

                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  .value = ${item.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                .value = ${item.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value = ${item.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value = ${item.contact}
            />
              <textarea
                id="about"
                name="about"
                .value = ${item.about}
                placeholder="about"
                rows="10"
                cols="50"
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
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
    const item = await dataService.getMotorcycleDetails(id);
    console.log(item);
    context.render(editTemp(item));
    itemId = item._id
    

}

async function onSubmit (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let {model,imageUrl,year,mileage,contact,about} = Object.fromEntries(formData);

    const itemEdited = {model,imageUrl,year,mileage,contact,about}

    if(!model || !imageUrl ||!year||!mileage||!contact||!about) { 
        return window.alert ("All fields are mandatory")
    }
        context.render(editTemp(itemEdited));

    await dataService.updateMotorcycle(id,itemEdited)
    context.goTo(`/catalog/${itemId}`)

}