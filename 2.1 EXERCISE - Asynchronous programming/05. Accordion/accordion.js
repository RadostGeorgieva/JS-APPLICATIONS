async function solution() {

        const data = await fetch(`http://localhost:3030/jsonstore/advanced/articles/list`);
        const articles = await data.json();
        let main = document.getElementById("main");
        main.replaceChildren();
        for(let article of Object.values(articles)){
            let acc =await addingData(article);
            main.appendChild(acc);
        }

        async function addingData(article){
            const linkData = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`);
            let additionalData = await linkData.json();

            let accordeon = document.createElement("div");
            accordeon.classList.add("accordion")

            let head = document.createElement("div");
            head.classList.add("head")

            let span = document.createElement("span");
            span.textContent = article.title;

            let btn = document.createElement("button");
            btn.setAttribute("id",`${article._id}`);
            btn.classList.add(`button`);
            btn.textContent = "More";

            let p = document.createElement("p");
            p.textContent = additionalData.content;

            let extra = document.createElement("div");
            extra.classList.add(`extra`);
            extra.classList.add(`${article._id}extra`);
            extra.style.display = "none";

            accordeon.appendChild(head);
            head.appendChild(span);
            head.appendChild(btn);
            accordeon.appendChild(extra);
            extra.appendChild(p);


            btn.addEventListener('click',() => handler(article))
            return accordeon;
        }

        function handler(article) {
            let extra = document.getElementsByClassName(`${article._id}extra`)[0]
            console.log(extra);
            if (extra.style.display == "block") {
                extra.style.display = "none"
            } else {
                extra.style.display = "block"
            }
        }
    }


solution();
