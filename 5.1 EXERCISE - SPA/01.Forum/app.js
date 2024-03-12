import { createPost } from "./createPost.js";
import {showPosts} from  "./showPosts.js"
console.log("here")
createPost();
showPosts()

document.querySelector("nav a").addEventListener("click",  showPosts)

