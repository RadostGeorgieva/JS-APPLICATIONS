import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const root = document.querySelector("main"); 

const itemsTemp = (items) => html`
        <h3 class="heading">Market</h3>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${items.map(item =>cardTemp(item))}
          `
          const cardTemp = (item) => html`
          <div class="item">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="model">${item.item}</h3>
            <div class="item-info">
              <p class="price">Price: €${item.price}</p>
              <p class="availability">${item.availability}</p>
              <p class="type">Type: ${item.type}</p>
            </div>
            <a class="details-btn" href="/catalog/${item._id}">Uncover More</a>
          </div>

        </section>
        `
const noItemsTemp = () => html`
<h3 class="heading">Market</h3>
<!-- Display an h2 if there are no posts -->
<h3 class="empty">No Items Yet</h3>
`

export async function showAllItemsView(ctx) {
    const data = await dataService.getAllItems()
    if(data.length <=0 || !data) {
      ctx.render(noItemsTemp())
    } else{
      ctx.render(itemsTemp(data)) 
     
    }
   
}