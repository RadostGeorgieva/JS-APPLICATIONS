function attachEvents() {
    let phonebook = document.getElementById("phonebook");

    let url = 'http://localhost:3030/jsonstore/phonebook/';

    document.getElementById("btnLoad").addEventListener('click', onLoad);
    document.getElementById("btnCreate").addEventListener('click', onCreate);

    let person = document.getElementById("person");
    let phone = document.getElementById("phone");

    async function onLoad() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            showData(data);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function onCreate(e) {


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ person: person.value, phone: phone.value })
            })

        } catch (err) {
            throw new Error(err.message);
        }
        person.value = "";
        phone.value = "";
        onLoad();
    }

    function showData(data) {
        phonebook.replaceChildren();
        for (let el of Object.values(data)) {
            let li = document.createElement("li");
            li.textContent = `${el.person}: ${el.phone}`;
            let button = document.createElement("button");
            button.textContent = "Delete";
            li.appendChild(button);
            phonebook.appendChild(li)
            button.addEventListener('click', function () {
                onDelete(li, el)
            })
            person.value = "";
            phone.value = "";


        }
    }
    async function onDelete(li, el) {
        console.log(li);
        li.remove();
        const response = await fetch(url + el._id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
    };
}

attachEvents();