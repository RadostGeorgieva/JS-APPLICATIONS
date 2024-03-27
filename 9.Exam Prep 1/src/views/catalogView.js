import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const root = document.querySelector("main"); 

const eventsTemp = (items) => html`
        <h2>Current Events</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${items.map(item =>cardTemp(item))}
        </section>
        `
        const cardTemp = (item) => html`
          <div class="event">
            <img src=${item.imageUrl} alt="example1" />
            <p class="title">
            ${item.name}
            </p>
            <p class="date"> ${item.date}</p>
            <a class="details-btn" href="/catalog/${item._id}"> Details</a>
          </div>
        `
const noEventsTemp = () => html`
 <h2>Current Events</h2>
         <!-- Display an h4 if there are no posts -->
         <h4>No Events yet.</h4>
`

export async function showAllEventsView(ctx) {
    const data = await dataService.getAllEvents()
    console.log(data.length);
    if(data.length <=0 || !data) {
      ctx.render(noEventsTemp())
    } else{
      ctx.render(eventsTemp(data)) 
     
    }
   
}