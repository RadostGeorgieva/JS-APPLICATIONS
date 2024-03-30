import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";
import { postBuyItem, getCountBought, getDidUserBuyIt } from "../service/buyingService.js";
import { userService } from "../service/userService.js";
import { userHelper } from "../utility/userHelper.js";


const detailsTemp = (item, isOwner,userId,boughtTimes,didUserBuy) => html`
   <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src=${item.imageUrl} 
              alt="example1"
            />
            <p id="details-title">${item.name}</p>
            <p id="details-category">
              Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${item.price}</span>$
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${boughtTimes}</span> times.</h4>
                <span>${item.description}</span>
              </div>
            </div>
                 <!--Edit and Delete are only for creator-->
                 <div id="action-buttons">
                 ${isOwner ? getButtons(item._id, isOwner) : ""}

                  <!--Bonus - Only for logged-in users ( not authors )-->
              ${!isOwner && userId?getBuyBtn(item._id,didUserBuy) : ""}
            </div>
          </div>
        </section>

`
function getBuyBtn(id,didUserBuy) {
    return !didUserBuy ? html` <a @click=${() => { onClick(id) }} href="" id="buy-btn">Buy</a>` : "";
    }
function getButtons(id, isOwner) {
  return html`
        <a href="/catalog/edit/${id}" id="edit-btn">Edit</a>
        <a href="/catalog/delete/${id}" id="delete-btn">Delete</a>
    `
}

export async function onClick(id) {

  await postBuyItem(id);

}

export async function showDetailsView(ctx) {

  const itemId = ctx.params.id;
  const item = await dataService.getItemDetails(itemId);
  let userId = userHelper.getUserId();
  let boughtTimes = await getCountBought(itemId);
  let didUserBuy = await getDidUserBuyIt(itemId, userId)
  console.log(didUserBuy);

  const isOwner = userHelper.hasOwner(item._ownerId)
  ctx.render(detailsTemp(item, isOwner,userId,boughtTimes,didUserBuy))
}

//fa11f70e-fe24-4d9b-a61b-36618635f617 owner of the post.