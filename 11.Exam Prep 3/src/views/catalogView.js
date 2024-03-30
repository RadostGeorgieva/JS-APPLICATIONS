import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const root = document.querySelector("main"); 

const itemsTemp = (items) => html`
         <h2>Products</h2>
        <section id="dashboard">

          <!-- Display a div with information about every post (if any)-->
          ${items.map(item =>cardTemp(item))}
          `
          const cardTemp = (item) => html`
          <div class="product">
            <img src=${item.imageUrl} alt="example1" />
            <p class="title">${item.name}</p>
            <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
            <a class="details-btn" href="/catalog/${item._id}">Details</a>
          </div>
          </section>
        `
const noItemsTemp = () => html`
  <h2>Products</h2>
 <!-- Display an h2 if there are no posts -->
 <h2>No products yet.</h2>

`

export async function showAllItemsView(ctx) {
    const data = await dataService.getAllItems()
    console.log(data.length);
    if(data.length <=0 || !data) {
      ctx.render(noItemsTemp())
    } else{
      ctx.render(itemsTemp(data)) 
     
    }
   
}