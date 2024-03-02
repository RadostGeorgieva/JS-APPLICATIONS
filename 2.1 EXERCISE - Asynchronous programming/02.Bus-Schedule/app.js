function solve() {
    let id = "depot";
    let nextStop = "";
    let url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;
    let text = document.getElementsByClassName("info")[0];
    let departBtn = document.getElementById("depart");
    let arriveBtn = document.getElementById("arrive");
    function depart() {
        departBtn.setAttribute("disabled", true);
        arriveBtn.removeAttribute("disabled");
        fetch(url)
            .then(onHeaders)
            .then(onSuccess)
            .catch(onError)
    }

    function arrive() {
        arriveBtn.setAttribute("disabled", true);
        departBtn.removeAttribute("disabled");
        text.textContent = `Arriving at ${nextStop}`;
    }

    function onHeaders(response) {
        if (!response.ok) {
            throw "Error";
        }
        return response.json();
    }

    function onSuccess({name, next}) {
            nextStop = name;
            text.textContent = `Next stop ${name}`;
            url = `http://localhost:3030/jsonstore/bus/schedule/${next}`;
       
    }
    function onError(error) {
        console.log(error);
        return
    }

    return {
        depart,
        arrive
    };
}

let result = solve();