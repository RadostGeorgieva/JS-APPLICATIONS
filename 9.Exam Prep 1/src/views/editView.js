import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const editTemp = (item)=> html`
   <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onSubmit} class="edit-form">
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                .value = "${item.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                .value = "${item.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                .value = "${item.category}"
              />


              <textarea
                id="event-description"
                name="description"
                .value="${item.description}"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              .value = "${item.date}"
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
      </main>
    </div>
    <footer>
      <p>@ Eventer </p>
    </footer>
  </body>
</html>

`


let context = null;
let id =null;
let itemId = null;
export async function showEditView(ctx) {
    context = ctx;
    id = context.params.id
    const item = await dataService.getEventDetails(id);
    context.render(editTemp(item));
    itemId = item._id
    

}

async function onSubmit (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let {name,imageUrl,category,description,date} = Object.fromEntries(formData);

    const itemEdited = {name,imageUrl,category,description,date}
    if(!name || !imageUrl ||!category||!description||!date) { 
        return window.alert ("All fields are mandatory")
      } else {
        context.render(editTemp(itemEdited));
      }


    await dataService.updateEvent(id,itemEdited)
    context.goTo(`/catalog/${itemId}`)

}