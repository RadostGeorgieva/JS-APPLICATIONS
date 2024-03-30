import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";
import { userService } from "../service/userService.js";
import { userHelper } from "../utility/userHelper.js";


const detailsTemp = (item, isOwner, userId) => html`
   <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-title">${item.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${item.year}</p>
                <p class="mileage">Mileage: ${item.mileage} km.</p>
                <p class="contact">Contact Number: ${item.contact}</p>
                   <p id = "motorcycle-description">
                   ${item.about}
                        </p>
              </div>
              <div id="action-buttons">
             ${isOwner ? getButtons(item._id, isOwner) : ""}
             </div>
        </section>
`

function getButtons(id, isOwner) {
  return html`
        <a href="/catalog/edit/${id}" id="edit-btn">Edit</a>
        <a href="/catalog/delete/${id}" id="delete-btn">Delete</a>
    `
}


export async function onClick(id) {

  await goToEvent(id);

}


export async function showDetailsView(ctx) {


  const itemId = ctx.params.id;

  const item = await dataService.getMotorcycleDetails(itemId);

  let userId = userHelper.getUserId();


  const isOwner = userHelper.hasOwner(item._ownerId)
  ctx.render(detailsTemp(item, isOwner, userId))
}

