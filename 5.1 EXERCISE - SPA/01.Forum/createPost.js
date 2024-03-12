import { showPosts } from "./showPosts.js"

export function createPost() {

    document.getElementsByClassName("public")[0].addEventListener("click", newPost);
    document.getElementsByClassName("cancel")[0].addEventListener("click", cancelBtn);

    function cancelBtn(event) {
        event.preventDefault();
        event.target.parentElement.parentElement.reset()
    }
    async function newPost(event) {

        event.preventDefault();
        const formData = new FormData(event.target.parentElement.parentElement);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        const title = data.topicName.trim();
        const username = data.username.trim();
        const content = data.postText.trim();
        let date = new Date();

        if (title == "" || username == "" || content == "") {
            alert("all input fields are mandatory!")
            return;
        }
        try {
            let post = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, username, content, date })
            })
            event.target.parentElement.parentElement.reset()

            showPosts()
        } catch {
            if (err) {
                alert(err.message)
                throw err;
            }
        }
    }

}
