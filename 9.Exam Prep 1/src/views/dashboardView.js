import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";


const root = document.querySelector("main"); 

const dashboardTemp = () => html`
  <!-- Home page -->
  <section id="home">
          <div class="home-intro">
            <h1 class="fancy">Welcome to our community-driven events website! We believe that the best events
              come from the community.</h1>
               
               <p>So why wait? Join our community today and start 
                 discovering and sharing the best events in your area!</p>
                 <a class="event-btn" href="/events">To Events</a>       
          </div>
          <img class="party-img" src="./images/party people.png" alt="event">
        </section>
`
export async function showDashboardView(ctx) {
    ctx.render(dashboardTemp())
}