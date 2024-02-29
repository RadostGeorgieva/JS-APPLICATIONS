window.addEventListener("load", addData);
async function addData() {
    let url = `http://localhost:3030/jsonstore/cookbook/recipes`;
    let recepies = await getRecepies(url)
    let main = document.querySelector('main');
    main.replaceChildren(...Object.values(recepies).map(putRecepieElements))

    async function getRecepies(url) {
        try{
        const response = await fetch(url);
        const recipes = await response.json();
        return recipes;
        }
        catch(err) {
            throw new Error(err);
        }
    }

    function putRecepieElements({_id, img, name }) {

        let article = document.createElement("article");
        article.classList.add("preview");
        let divTitle = document.createElement("div");
        divTitle.classList.add("title");
        let h2 = document.createElement("h2");
        h2.textContent = name;
        divTitle.appendChild(h2);
        article.appendChild(divTitle);
        let divImg = document.createElement("div");
        divImg.classList.add("small");
        let image = document.createElement("img");
        image.src = img;
        divImg.appendChild(image);
        article.appendChild(divImg);
        console.log(article);
        article.addEventListener("click",() => showRecepie(article,_id,image,name));
        return article;
    }
    async function showRecepie (article,id,img,name) {
        let url =  `http://localhost:3030/jsonstore/cookbook/details/${id}`;
        let currentData = await getRecepies(url);

        let articleDetails = document.createElement("article");
        let h2 = document.createElement("h2");
        h2.textContent = name;
        articleDetails.appendChild(h2);
        let divBand = document.createElement("div");
        divBand.classList.add("band");
        let divThumb = document.createElement("div");
        divThumb.classList.add("thumb");
        divThumb.appendChild(img);
        divBand.appendChild(divThumb);
        let divIngredients= document.createElement("div");
        divThumb.classList.add("ingredients");
        let h3 = document.createElement("h3");
        h3.textContent = `Ingredients:`;
        let ul = document.createElement("ul");
        for(let el of currentData.ingredients) {
            let li = document.createElement("li");
            li.textContent = el;
            ul.appendChild(li);
        }
        divIngredients.appendChild(h3);
        divIngredients.appendChild(ul);
        divBand.appendChild(divIngredients);
        articleDetails.appendChild(divBand);

        let description= document.createElement("div");
        description.classList.add("description");
        let h3desc = document.createElement("h3");
        h3desc.textContent = `Preparation:`;
        description.appendChild(h3desc);
        for(let el of currentData.steps) {
            let p = document.createElement("p");
            p.textContent = el;
            description.appendChild(p);
        }
        articleDetails.appendChild(description);
        main.replaceChildren(articleDetails)
        return;


    }

}
