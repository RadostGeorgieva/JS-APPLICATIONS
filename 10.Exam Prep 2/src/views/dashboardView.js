import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";


const root = document.querySelector("main"); 

const dashboardTemp = () => html`
    <!-- Home page -->
    <section id="home">
          <h1>
            Welcome to <span>Samurider</span> moto market, your premier destination for Japanese motorcycles.</h1>
          <img
            src="./images/motorcycle.png"
            alt="home"
          />

        </section>
`
export async function showDashboardView(ctx) {
    ctx.render(dashboardTemp())
}