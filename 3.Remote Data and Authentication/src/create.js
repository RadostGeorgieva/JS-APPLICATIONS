window.addEventListener('load', start);

function start() {
    const userData = localStorage.getItem('user');
    if(!userData) {
        window.location = 'login.html'
    }
    document.querySelector('form').addEventListener('submit', createRecipe);

}

async function createRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const name = data.name.trim();
    const image = data.img.trim();
    const ingredients = convertToArray(data.ingredients);
    const preparation = convertToArray(data.steps);

    const user = JSON.parse(localStorage.getItem('user'));
    const id = user._id;
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const urlPreparation = 'http://localhost:3030/jsonstore/cookbook/details/';

    try {
    
        const res = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, image})
        })
        const resPrep = await fetch(urlPreparation, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, image,preparation,ingredients})
        })


        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message)
        }
        if (!resPrep.ok) {
            const err = await res.json();
            throw new Error(err.message)
        }

        window.location = 'index.html';
    } catch (err) {
        alert(err.message)
    }

    function convertToArray(data) {
        let array = data.trim().split('\n');
        return array;
    }

}

