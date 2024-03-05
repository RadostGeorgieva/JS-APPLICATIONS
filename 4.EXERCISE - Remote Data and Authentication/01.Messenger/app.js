function attachEvents() {
    document.getElementById("submit").addEventListener('click', onSubmit);
    document.getElementById("refresh").addEventListener('click', onRefresh);
    const url = 'http://localhost:3030/jsonstore/messenger';

    async function onSubmit(e) {
        let authorValue = document.getElementsByName("author")[0]
        let contentValue = document.getElementsByName("content")[0];
        try {
            const res = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: authorValue.value,
                    content: contentValue.value
                })
            })

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }

        }
        catch (err) {
            console.log(err.message);
        }
        authorValue.value = "";
        contentValue.value = "";
    }
   
async function onRefresh(e) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayData(data);
    }
    catch (err) {
        console.log(err);
    }
}

function displayData(data) {
    let textArea = document.getElementById("messages");
    let arr = [];
    for(el of Object.values(data)) {
        arr.push(`${el.author}: ${el.content}`);
    }
    textArea.textContent = arr.join("\n");
}
}


attachEvents();
