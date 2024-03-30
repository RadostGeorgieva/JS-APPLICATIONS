import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const root = document.querySelector("main"); 

const motorcyclesTemp = (items) => html`
    <!-- Dashboard page -->
    <h2>Available Motorcycles</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${items.map(item =>cardTemp(item))}
          </section>
          `
          const cardTemp = (item) => html`
          <div class="motorcycle">
            <img src="${item.imageUrl}" alt="example1" />
            <h3 class="model">${item.model}</h3>
            <p class="year">Year: ${item.year}</p>
            <p class="mileage">Mileage: ${item.mileage} km.</p>
            <p class="contact">Contact Number: ${item.contact}</p>
            <a class="details-btn" href="/catalog/${item._id}">More Info</a>
          </div>
        `
const noMotorcyclesTemp = () => html`
          <!-- Display an h2 if there are no posts -->
          <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>
`

export async function showAllMotorcyclesView(ctx) {
    const data = await dataService.getAllMotorcycles()
    if(data.length <=0 || !data) {
      ctx.render(noMotorcyclesTemp())
    } else{
      ctx.render(motorcyclesTemp(data)) 
     
    }
   
}