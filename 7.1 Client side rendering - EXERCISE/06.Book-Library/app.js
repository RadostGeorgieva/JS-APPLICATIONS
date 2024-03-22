import { html, render } from './node_modules/lit-html/lit-html.js';

    document.getElementById("loadBooks").addEventListener("click", loadBooks);
    document.getElementById("add-form").addEventListener("submit", addBooks);

    async function addBooks(event) {
        event.preventDefault();

        const form = event.target;

        const title = form.elements['title'].value;
        const author = form.elements['author'].value;
        let post = await fetch(`http://localhost:3030/jsonstore/collections/books/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "author": author, "title": title })
        })
        form.reset();
        loadBooks()

    
    }
    async function loadBooks(event) {
        let root = document.getElementById("books").querySelector("tbody");
        let books = await getBooks();
        let loadCurrentBook = (book) => html`
     <tr>
                <td>${book[1].title}</td>
                <td>${book[1].author}</td>
                <td>
                    <button @click = ${editHandler} id="${book[0]}">Edit</button>
                    <button @click = ${deleteHandler} id="${book[0]}">Delete</button>
                </td>
    </tr>
    `
        render(Object.entries(books).map(loadCurrentBook), root)
    }
    async function getBooks() {
        let req = await fetch("http://localhost:3030/jsonstore/collections/books");
        const books = await req.json();
        return books
    }
    async function deleteHandler(event) {
        let post = await fetch(`http://localhost:3030/jsonstore/collections/books/${event.target.id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        loadBooks()
    }
    function editHandler(event) {

        document.getElementById("add-form-container").style.display = "none";
        // Remove existing edit form container
        let existingEditFormContainer = document.getElementById("edit-form-container");
        if (existingEditFormContainer) {
            existingEditFormContainer.remove();
        }
        // Create a new edit form container
        let editFormContainer = document.createElement("div");
        editFormContainer.id = "edit-form-container";

        let updateEdit = () => html`
        <form id="edit-form"> 
            <input type="hidden" name="id">
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" value="${event.target.parentElement.parentElement.children[0].textContent}">
            <label>AUTHOR</label>
            <input type="text" name="author" value="${event.target.parentElement.parentElement.children[1].textContent}">
            <input @click=${saveHandler} type="submit" value="Save" id="${event.target.id}">
        </form>
    `;
        render(updateEdit(), editFormContainer);

        document.body.appendChild(editFormContainer);
    }

    async function saveHandler(event) {

        event.preventDefault();
        let editedTitle = event.target.parentElement.children[3];
        let editedAuthor = event.target.parentElement.children[5];
        console.log(event.target);
        await postEdited(editedTitle.value, editedAuthor.value, event.target.id);
        editedTitle.value = "";
        editedAuthor.value = "";
        document.getElementById("add-form-container").style.display = "block"
        let existingEditFormContainer = document.getElementById("edit-form-container");
        if (existingEditFormContainer) {
            existingEditFormContainer.remove();
        }


    }

    async function postEdited(title, author, id) {

        let post = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "author": author, "title": title })
        })
        loadBooks()
    }
