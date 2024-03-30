import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";


const root = document.querySelector("main"); 

const dashboardTemp = () => html`
    <!-- Home page -->
    <section id="hero">
          <img src="./images/home.png" alt="home" />
          <p>We know who you are, we will contact you</p>
        </section>
`
export async function showDashboardView(ctx) {
    ctx.render(dashboardTemp())
}