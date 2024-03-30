import page from "../node_modules/page/page.mjs";
import {html,render} from "../node_modules/lit-html/lit-html.js"
import { userHelper } from "./utility/userHelper.js";
import {showRegisterView} from "./views/registerView.js"
import { showDashboardView } from "./views/dashboardView.js";
import { showLoginView } from "./views/loginView.js";
import { showLogoutView } from "./views/logoutView.js";
import {showAllItemsView} from "./views/catalogView.js"
import { showDetailsView } from "./views/detailsView.js";
import {showCreateView} from "./views/createView.js"
import {showEditView} from "./views/editView.js"
import {deleteItem} from "./views/deleteView.js"

/*
import * as api from "./service/goingService.js"
*/

const root = document.querySelector("main"); 
const userRef = document.querySelector("div.user");
const guestRef = document.querySelector("div.guest");


page(updateCTX)

page('/', showDashboardView);//home
page("/catalog/:id",showDetailsView);//EventDetails
page("/create",showCreateView)
page("/catalog/edit/:id",showEditView);//
page("/catalog/delete/:id", deleteItem);//
page("/catalog",showAllItemsView);//
page("/login",showLoginView);//
page("/register",showRegisterView);//
page("/logout",showLogoutView);//




updateNav();
page.start()

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

 function goTo(path) {//
    page.redirect(path);
}
