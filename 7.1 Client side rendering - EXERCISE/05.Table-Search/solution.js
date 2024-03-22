import { render, html } from './node_modules/lit-html/lit-html.js'
async function solve() {
   let items = await getAllItems();
   displayItems(Object.values(items));
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   async function onClick() {
      let allData = document.querySelectorAll("td");
      let searched = document.getElementById("searchField");

      allData.forEach(element => { element.parentElement.classList.remove("select"); });

      allData.forEach(element => {

         if (element.textContent.toLocaleLowerCase().includes(searched.value.toLocaleLowerCase())) {
            element.parentElement.classList.add("select");
         }
      });
      searched.value = "";
   }

   async function getAllItems() {
      let req = await fetch(`http://localhost:3030/jsonstore/advanced/table`);
      let data = await req.json();
      return data;
   }
   function displayItems(items) {
      let root = document.getElementsByClassName("container")[0].children[1]
      let addingRow = (element) => html`
       <tr>
                <td>${element.firstName} ${element.lastName}</td>
                <td>${element.email}</td>
                <td>${element.course}</td>
            </tr>
      `
      render(items.map(addingRow), root)
   }


}
solve()