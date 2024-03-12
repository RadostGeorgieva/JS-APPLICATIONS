let commentDiv = document.createElement("div");
      commentDiv.classList.add("all-comments")

export async function getSubmittedComments(id) {
    console.log(id);
    await fetch('http://localhost:3030/jsonstore/collections/myboard/comments')
        .then(onHeaders)
        .then((data) => onSuccess(id, data))
        .catch((error) => console.error('Error fetching comments:', error));
}

function onHeaders(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function onSuccess(id, data) {
    console.log("here i go");
     commentDiv.innerHTML = "";

     for (const key in data) {
    
         if (data.hasOwnProperty(key)) {
             const obj = data[key];
             if (obj.idofPost === id) {
                commentDiv.innerHTML+= ` <div id="user-comment">
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <p><strong>${obj.username}</strong> commented on <time>${obj.date}</time></p>
                        <div class="post-content">
                            <p>${obj.content}</p>
                        </div>
                    </div>
                </div>
                </div>`
                document.getElementsByClassName("comment")[0].appendChild(commentDiv)
            }
        }
    }
    
}