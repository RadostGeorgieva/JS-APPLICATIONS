import { getSubmittedComments} from "./commentsView.js"

export async function addNewComment (event,idofPost) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const username = data.username.trim();
    const content = data.postText.trim();
    let date = new Date();
    console.log(idofPost);
    if (username == "" || content == "") {
        alert("all input fields are mandatory!")
        return;
    }
    try {
        console.log(idofPost);
        let post = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, content, date, idofPost})
        })
        event.target.reset()
        getSubmittedComments(idofPost)

        
    } catch {
        if (err) {
            alert(err.message)
            throw err;
        }
    }
}