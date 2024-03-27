import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const createViewTemp = (error)=> html`
    <section id="create">
          <div @submit=${onSubmit} class="form">
            <h2>Add Event</h2>
            <form class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

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
    let {name,imageUrl,category,description,date} = Object.fromEntries(formData);

    if(!name || !imageUrl ||!category||!description||!date) { 
      return window.alert ("All fields are mandatory")
    }

     context.render(createViewTemp());
    

    await dataService.createEvent({name,imageUrl,category,description,date})
    context.goTo("/catalog") 
}