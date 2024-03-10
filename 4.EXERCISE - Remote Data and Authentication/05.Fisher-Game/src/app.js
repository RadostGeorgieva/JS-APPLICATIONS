function solve() {
    let userData = JSON.parse(localStorage.getItem("user"));
    document.getElementById("home").classList.add("active");
    document.getElementById("register").classList.remove("active");
    document.getElementById("login").classList.remove("active");
    document.getElementById("addForm").addEventListener("submit", addNew)
    function isUser(el_ownerId) {
        if(userData?._id != el_ownerId){
            return false
        }
        return true;
    }
    async function onDelete(e) {
        const btn = e.target.dataset
        console.log(btn.id);
        await fetch(`http://localhost:3030/data/catches/${btn.id}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json',"X-Authorization":userData.accessToken },
        })
        loadData()
    }
    async function onUpdate(e) {
        let angler = e.target.parentElement.children[1].value
        let weight =  e.target.parentElement.children[3].value
        let species =  e.target.parentElement.children[5].value
        let location =  e.target.parentElement.children[7].value
        let bait =  e.target.parentElement.children[9].value
        let captureTime = e.target.parentElement.children[11].value
        let _ownerId = userData._id;
        const btn = e.target.dataset
        if(!angler ||!weight||!species||!location||!bait||!captureTime){
            console.log(angler,weight,species,location,bait,captureTime);
            return;
        }
        const url = `http://localhost:3030/data/catches/${btn.id}`;

            const res = await fetch(url, {
                method: 'put',
                headers: { 'Content-Type': 'application/json',"X-Authorization":userData.accessToken },
                body: JSON.stringify({"_ownerId":_ownerId,"angler":angler,"weight":weight,"species":species,"location":location,"bait":bait,"captureTime":captureTime})
            })
            console.log("here");
           
            loadData()
    }
    async function addNew(e) {
        debugger
        e.preventDefault();
        let form = new FormData(e.target)
        let angler = form.get("angler")
        let weight = form.get("weight")
        let species = form.get("species")
        let location = form.get("location")
        let bait = form.get("bait")
        let captureTime = form.get("captureTime")
        let _ownerId = userData._id;
        if(!angler ||!weight||!species||!location||!bait||!captureTime){
            console.log("err");
            return;
        }
        const url = 'http://localhost:3030/data/catches';

            const res = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json',"X-Authorization":userData.accessToken },
                body: JSON.stringify({"_ownerId":_ownerId,"angler":angler,"weight":weight,"species":species,"location":location,"bait":bait,"captureTime":captureTime})
            })
            console.log("here");
           
            loadData()
    }
    if (userData) {
        document.getElementById("user").style.display = "inline-block";
        document.getElementById("guest").style.display = "none";
        document.getElementsByClassName("add")[0].disabled = false;
        document.getElementsByClassName("email")[0].children[0].textContent = userData.email;
        document.getElementById("logout").addEventListener("click", async () => {
            localStorage.clear();
            window.location = 'index.html';
        })
    } else {

        document.getElementById("user").style.display = "none";
        document.getElementById("guest").style.display = "inline-block";
    }

    document.getElementsByClassName("load")[0].addEventListener("click", loadData)
    
    async function loadData() {
        console.log("back here")
        let url = 'http://localhost:3030/data/catches/';
        fetch(url)
            .then(onHeaders)
            .then(onSuccess)

        function onHeaders(response) {
            if (!response.ok) {

                throw "Error";
            }
            return response.json();
        }
        function onSuccess(data) {
            
            let catches = document.getElementById("catches");
            catches.innerHTML = "";
            for (let el of Object.values(data)) {
                let owner = !(isUser(el._ownerId))
                console.log(el._ownerId);
                console.log(userData._id);
                let catchDiv = document.createElement("div");
                catchDiv.classList.add("catch");
                catchDiv.innerHTML += `
        <label>Angler</label>
        <input type="text" class="angler" ${owner ? "disabled" : ""} value=${el.angler}>
        <label>Weight</label>
        <input type="text" class="weight" ${owner ? "disabled" : ""} value=${el.weight}>
        <label>Species</label>
        <input type="text" class="species"  ${owner ? "disabled" : ""} value=${el.species}>
        <label>Location</label>
        <input type="text" class="location" ${owner ? "disabled" : ""} value=${el.location}>
        <label>Bait</label>
        <input type="text" class="bait"  ${owner ? "disabled" : ""} value=${el.bait}>
        <label>Capture Time</label>
        <input type="number" class="captureTime" ${owner ? "disabled" : ""} value=${el.captureTime}>

    `
                let updateBtn = document.createElement("button");
                updateBtn.classList.add("update");
                updateBtn.dataset.id = el._id;
                updateBtn.textContent = "Update";

                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete");
                deleteBtn.dataset.id = el._id;
                deleteBtn.textContent = "Delete";
                if (!isUser(el._ownerId)) {
                    updateBtn.disabled = true;
                    deleteBtn.disabled = true;
                }
                catchDiv.appendChild(updateBtn);
                catchDiv.appendChild(deleteBtn);
                catches.appendChild(catchDiv);
                deleteBtn.addEventListener("click", onDelete);
                updateBtn.addEventListener("click", onUpdate);

            }
        }

    }

}

solve();