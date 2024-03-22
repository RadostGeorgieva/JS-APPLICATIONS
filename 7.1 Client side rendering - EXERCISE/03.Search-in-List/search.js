import { html, render } from './node_modules/lit-html/lit-html.js'
import { towns } from './towns.js'
function search() {
   let root = document.getElementById("towns");
   let inputTowns = (towns) => html`
   <ul>${towns.map((town) => html` 
                <li>${town}</li>
                `
   )}
              
            </ul>
 `

   render(inputTowns(towns), root)
   document.getElementsByTagName("button")[0].addEventListener("click", onClick);

   function onClick(e) {
      let counter = 0;
      let text = document.getElementById("searchText").value;
      const townListItems = document.querySelectorAll("li");
      townListItems.forEach((town) => {
         if (town.textContent.includes(text)) {
            town.classList.add("active");
            counter++;
         } else {
            town.classList.remove("active");
         }
     }
      )
    document.getElementById("result").textContent = `${counter} matches found`
   }

}
search()
