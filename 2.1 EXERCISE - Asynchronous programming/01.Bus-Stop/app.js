function getInfo() {
    let stopId = document.getElementById("stopId");
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`;
    let stopName = document.getElementById("stopName");
    let ul = document.getElementById("buses");
    fetch(url)
        .then(onHeaders)
        .then(onSuccess)
        .catch(onError);

    function onHeaders(response) {
        if (!response.ok) {

            throw "Error";
        }
        return response.json();
    }
    function onSuccess(data) {
        console.log(data);
        console.log("im onsuccess");
        stopName.textContent = data.name;
        for(el of Object.entries(data.buses)){
        let li = document.createElement("li");
        li.textContent = `Bus ${el[0]} arrives in ${el[1]} minutes`;
        ul.appendChild(li)
        }
        stopId.value = "";
        return;
    }
    function onError(error) {
        console.log(error);
        stopName.textContent = "Error";
    }
}
