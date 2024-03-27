import page from "../node_modules/page/page.mjs";
import {html,render} from "../node_modules/lit-html/lit-html.js";
import { showDashboardView } from "./views/dashboardView.js";
import {showRegisterView} from "./views/registerView.js"
import { userHelper } from "./utility/userHelper.js";
import { showLoginView } from "./views/loginView.js";
import { showLogoutView } from "./views/logoutView.js";
import { showDetailsView } from "./views/detailsView.js";
import {showCreateView} from "./views/createView.js"
import {showMyFurnitureView} from "./views/myFurnitureView.js"
import {deleteItem} from "./views/deleteView.js"
import { showEditView } from "./views/editView.js";


const root = document.querySelector("div[data-id='root']"); 
const userRef = document.getElementById("user");
const guestRef = document.getElementById("guest");


page(updateCTX)
page("/", showDashboardView);
page("/dashboard",showDashboardView);
page("/create", showCreateView);
page("/details/:id",showDetailsView);
page("/edit/:id", showEditView);
page("/delete/:id", deleteItem);
page("/myFurniture",showMyFurnitureView);
page("/login",showLoginView);
page("/register", showRegisterView);
page("/logout", showLogoutView);

page.start()
updateNav();

function renderer(temp) {
render(temp, root);
}

function updateCTX(ctx, next) {
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;
    next()
} 

function updateNav() {
     const user = userHelper.getUserData();
    if(user) {
        userRef.style.display = "inline-block"; 
        guestRef.style.display = "none"
    } else {
        userRef.style.display = "none";
        guestRef.style.display = "inline-block"
    }
}

function goTo(path) {
    page.redirect(path);
}