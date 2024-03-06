function solve() {
    window.addEventListener('load',showData);
    document.querySelector('form').addEventListener('submit', onSubmit)
    let url = 'http://localhost:3030/jsonstore/collections/students/';

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        addData(data);
        
    }
    
    async function addData(data) {
        if (data.firstName == "" ||data.lastName == ""||data.facultyNumber == ""|| data.grade == "") {
            console.log("all fields are mandatory");
            return;
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data)
            }
            )
            showData()
        } catch (err) {
            console.log(data);
            throw new Error(err.message);
        }
    }
    async function showData() {
        const clearFields = (arr) => arr.forEach(x => x.value = '');
        clearFields([...document.querySelectorAll('#form > div.inputs > input[type=text]')])
        let url = 'http://localhost:3030/jsonstore/collections/students/';
            const response = await fetch(url);
            const data = await response.json();
            let tBody = document.getElementsByTagName("tbody")[0];
            tBody.innerHTML = "";
            for (let el of Object.values(data)) {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${el.firstName}</td><td>${el.lastName}</td><td>${el.facultyNumber}</td><td>${el.grade}</td>`
                tBody.appendChild(tr);
            }
    }
}
solve();