import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";
import { getIsGoing, getVisitorsByEventId, goToEvent } from "../service/goingService.js";
import { userService } from "../service/userService.js";
import { userHelper } from "../utility/userHelper.js";


const detailsTemp = (item, isOwner, visitors, isUserGoing,userId) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-title">${item.name}</p>
            <p id="details-category">
              Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${item.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${item.description}</span>
              </div>

            </div>
            <h3>Going: <span id="go">${visitors}</span> times.</h3>
             <!--Edit and Delete are only for creator-->
             <div id="action-buttons">
             ${isOwner ? getButtons(item._id, isOwner) : ""}
             
              <!--Bonus - Only for logged-in users ( not authors )-->
              ${!isOwner && userId?getGoingBtn(item._id, isOwner,isUserGoing) : ""}
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
function getGoingBtn(id, isAuthor,isUserGoing) {
return !isUserGoing ? html` <a @click=${() => { onClick(id) }} href="" id="go-btn">Going</a>` : "";
}

export async function onClick(id) {

  await goToEvent(id);

}


export async function showDetailsView(ctx) {


  const itemId = ctx.params.id;
  const item = await dataService.getEventDetails(itemId);
  let userId = userHelper.getUserId();

  let visitors = await getVisitorsByEventId(itemId);
  let isUserGoing = await getIsGoing(itemId, userId)
  console.log(isUserGoing);

  const isOwner = userHelper.hasOwner(item._ownerId)
  ctx.render(detailsTemp(item, isOwner, visitors,isUserGoing,userId))
}

//fa11f70e-fe24-4d9b-a61b-36618635f617 owner of the post.