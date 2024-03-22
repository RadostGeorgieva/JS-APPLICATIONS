import {register} from "./userService.js"
import {showHome} from "./home.js"
import { setUserData } from "./userHelper.js";
import { updateNav } from "./app.js";


document.getElementById("register-form").addEventListener("submit", onRegister);

export function showRegister() {
    document.querySelectorAll("section").forEach(section => { section.style.display = "none"; })
    document.getElementById("form-sign-up").style.display = "block";
}

async function onRegister (e) {
    
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const rePass = formData.get("repeatPassword");
    debugger
    if(!email ||!password || !rePass || password.lenght < 6 || password!= rePass) {
        return alert("Error from register!");
    }

    const data = await register({email,password})
    setUserData(data)
    updateNav()
    showHome();
}

 