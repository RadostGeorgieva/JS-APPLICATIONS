
let url = 'http://localhost:3030/jsonstore/collections/books/'
document.getElementById("loadBooks").addEventListener('click', letShowData);

async function letShowData() {

    const response = await fetch(url);
    const data = await response.json();
    let table = document.getElementsByTagName("tbody")[0];
    table.innerHTML = "";

    for (let el of Object.entries(data)) {

        let tr = document.createElement("tr");
        let titleTd = document.createElement("td");
        titleTd.textContent = el[1].title
        let authorTd = document.createElement("td");
        authorTd.textContent = el[1].author;
        let buttons = document.createElement("td");
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.setAttribute("id", el[0])

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("id", el[0])
        tr.appendChild(titleTd);


        tr.appendChild(authorTd);
        tr.appendChild(buttons);
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        table.appendChild(tr);
    }
    addEventListeners();
}
function addEventListeners() {

    let allBtns = document.getElementsByTagName("button");
    for (btn of allBtns) {
        if (btn.textContent == "Edit") {
            btn.addEventListener('click', editStart)
        }
        if (btn.textContent == "Delete") {
            btn.addEventListener('click', deleteBtn)
        }
    }
    let submit = document.getElementsByClassName("submit")[0].children[5];
    console.log(submit);
    submit.addEventListener('click',submitBook);
}
async function submitBook(event) {
    console.log("here");
    event.preventDefault();
    debugger
    let formTitle = document.getElementsByClassName("submit")[0].children[2];
    console.log(formTitle);
    let formAuthor = document.getElementsByClassName("submit")[0].children[4];

    let url = 'http://localhost:3030/jsonstore/collections/books/'


    await fetch(url,{
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ "author": formTitle.value, "title": formAuthor.value })
    });
    formTitle.value = "";
    formAuthor.value = "";
    
    letShowData();
}
async function deleteBtn(event) {
    event.preventDefault();
    let url = 'http://localhost:3030/jsonstore/collections/books/'

    let id = event.target.id;

    await fetch(url + id, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
    });

    letShowData();
}
function editStart(event) {
    document.getElementsByClassName("edit")[0].style.display = "block";
    document.getElementsByClassName("submit")[0].style.display = "none";
    let titleCurrentData = event.target.parentElement.parentElement.children[0];
    let authorCurrentData = event.target.parentElement.parentElement.children[1];
    
    let formTitle = document.getElementsByClassName("edit")[0].children[2];
    console.log(formTitle);
    let formAuthor = document.getElementsByClassName("edit")[0].children[4];
    formTitle.value = titleCurrentData.textContent;
    formAuthor.value = authorCurrentData.textContent;
    let save =  document.getElementsByClassName("edit")[0].children[5];
    let idOriginal = event.target.id;

    save.setAttribute("id", idOriginal)

    save.addEventListener('click', async (event) => {
        event.preventDefault();

        let url = 'http://localhost:3030/jsonstore/collections/books/'
        let titleNew = formTitle.value
        let authorNew = formAuthor.value
        let id = event.target.id;

        try {
            if (titleNew == "" || authorNew == "") {
                return;
            }
            await fetch(url + id, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ "author": authorNew, "title": titleNew })
            });

            letShowData();
            formTitle.value = "";
            formAuthor.value = "";
            document.getElementsByClassName("edit")[0].style.display = "none";
            document.getElementsByClassName("submit")[0].style.display = "block";

        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    });
}

