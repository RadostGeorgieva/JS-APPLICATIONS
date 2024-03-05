function solve() {
    document.addEventListener('submit', onSubmit)
    let url = 'http://localhost:3030/jsonstore/collections/students/';

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        addData(data);
        const clearFields = (arr) => arr.forEach(x => x.value = '');
        clearFields([...document.querySelectorAll('#form > div.inputs > input[type=text]')])

    }

    async function addData(data) {
        if ((data.firstName == "" && typeof(data.firstName) == "string") || (data.lastName == "" && typeof(data.lastName) == "string")||(data.facultyNumber == ""&& typeof(data.facultyNumber) == "string") || (data.grade == ""&& typeof(data.grade) == "number")) {
            console.log("all fields are mandatory");
            return;
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ firstName: data.firstName, lastName: data.lastName, facultyNumber: data.facultyNumber, grade: Number(data.grade) })
            }
            )
            showData()
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async function showData() {
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