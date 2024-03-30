import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";
import { userService } from "../service/userService.js";
import { userHelper } from "../utility/userHelper.js";


const detailsTemp = (item, isOwner,userId) => html`
   <!-- Details page -->
   <section id="details">
          <div id="details-wrapper">
            <div>
              <img id="details-img" src=${item.imageUrl} alt="example1" />
              <p id="details-title">${item.item}</p>
            </div>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="details-price">Price: €${item.price}</p>
                <p class="details-availability">${item.availability}</p>
                <p class="type">Type: ${item.type}</p>
                <p id="item-description">${item.description}</p>
              </div>
              <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
              ${isOwner ? getButtons(item._id, isOwner) : ""}
              </div>
            </div>
          </div>
        </section>
`
function getButtons(id, isOwner) {
  return html`
        <a href="/catalog/edit/${id}" id="edit-btn">Edit</a>
        <a href="/catalog/delete/${id}" id="delete-btn">Delete</a>
    `
}



export async function showDetailsView(ctx) {

  const itemId = ctx.params.id;
  const item = await dataService.getItemDetails(itemId);
  let userId = userHelper.getUserId();
  console.log(item);

  const isOwner = userHelper.hasOwner(item._ownerId)
  ctx.render(detailsTemp(item, isOwner,userId))
}

//fa11f70e-fe24-4d9b-a61b-36618635f617 owner of the post.