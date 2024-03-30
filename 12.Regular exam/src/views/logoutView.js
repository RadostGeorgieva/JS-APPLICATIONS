import { html} from "../../node_modules/lit-html/lit-html.js"
import { userService } from "../service/userService.js";
import { userHelper } from "../utility/userHelper.js";

 export async function showLogoutView(ctx) {
    await userService.logout();
    userHelper.clearUserData();
    ctx.updateNav();
    ctx.goTo("/");
 }