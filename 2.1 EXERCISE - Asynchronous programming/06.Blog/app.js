async function attachEvents() {
    let loadPostsBtn = document.getElementById("btnLoadPosts");
    let postsSelect = document.getElementById("posts");
    loadPostsBtn.addEventListener("click", async () => {
        const dataPosts = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
        const posts = await dataPosts.json();
        for(el of Object.values(posts)) {
            let option = document.createElement("option");
            option.value = el.id;
            option.textContent = el.title;
            postsSelect.appendChild(option);
        }

    })
    let btnViewPosts = document.getElementById("btnViewPost");
    btnViewPosts.addEventListener("click", async () => {
        let selectedOption = postsSelect.value;
        const allComments = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
        const comments = await allComments.json();
        let filteredComments = Object.values(comments).filter((c) => c.postId ===selectedOption);
        postTitle = document.getElementById("post-title");
        postTitle.textContent = postsSelect.options[postsSelect.selectedIndex].text;
        
        const dataPosts = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
        const posts = await dataPosts.json();
        let filterPost = Object.values(posts).find((currentP) => currentP.id === selectedOption);
        
        let postBody = document.getElementById("post-body");
        postBody.textContent = filterPost.body;
        let commentsUl = document.getElementById("post-comments");
        commentsUl.replaceChildren()
        for(com of filteredComments) {
            let li = document.createElement("li");
            li.setAttribute("id", com.id)
            li.textContent = com.text;
            commentsUl.appendChild(li)
        }
        

    })

}

attachEvents();