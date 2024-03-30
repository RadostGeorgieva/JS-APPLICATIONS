import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";

const root = document.querySelector("main");

const searchTemp = () => html`
    <section id="search">

<div class="form">
  <h4>Search</h4>
  <form @submit=${onSubmit} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>

</section>
        `
const resultTemp = (results) => html`
 <section id="search">

<div class="form">
  <h4>Search</h4>
  <form class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
<div class="search-result">
            ${results.map(result => html`
                <div class="motorcycle">
                    <img src=${result.imageUrl} alt="example1" />
                    <h3 class="model">${result.model}</h3>
                    <a class="details-btn" href="/catalog/${result._id}">More Info</a>
                </div>
            `)}

  </div>
        </section>
        `
const noResultsTemp = () => html`
        
        <section id="search">

        <div class="form">
          <h4>Search</h4>
          <form class="search-form">
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list">Search</button>
          </form>
        </div>
        <h4 id="result-heading">Results:</h4>
          <div class="search-result">
         <h2 class="no-avaliable">No result.</h2>
          </div>
                </section>
 `

let context = null

export function showSeachView(ctx) {
    context = ctx;
    ctx.render(searchTemp())
}

async function onSubmit(e) {
  debugger

    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search')
    if (!query) {
    window.alert("search field is mandatory")
    return;
    }
    try {
        let result = await fetch(`http://localhost:3030/data/motorcycles?where=model%20LIKE%20%22${query}%22`);
        if (result.ok) {
            console.log(result);
            const data = await result.json();
            if(data.length<=0) {
              render(noResultsTemp(), root);
            } else {
              console.log(data);
              render(resultTemp(data), root);
            }
        } else {
            // Handle non-404 errors here
            window.alert("An error occurred. Please try again.");
        }
    } catch (error) {
        // Handle errors here, including 404
        console.error(error);
        
    }

}