window.addEventListener('load', start);

function start() {
    document.querySelector('form').addEventListener('submit', onLogin);
    document.getElementById("user").style.display = "none";
    document.getElementById("home").classList.remove("active");
    document.getElementById("register").classList.remove("active");
    document.getElementById("login").classList.add("active");

}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const email = data.email.trim();
    const password = data.password.trim();

    const url = 'http://localhost:3030/users/login';

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message)
        }

        const userData = await res.json();

        localStorage.setItem('user', JSON.stringify(userData));



        window.location = 'index.html';
    } catch (err) {
        alert(err.message)
    }

}