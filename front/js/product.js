// On récupère l'url courante avec son "id"
const idProductUrl = new URL(document.location).searchParams.get('id');
const idProductUrlAPI = `http://localhost:3000/api/products/${idProductUrl}`

const getOneArticle = () => {
    fetch(idProductUrlAPI)
        .then(res => res.json())
        .then(function(data){
            
            const getImage = document.createElement("img")
            document.querySelector(".item__img").appendChild(getImage);
            getImage.src = data.imageUrl
            getImage.alt = data.altTxt

            const getTitle = document.getElementById("title");
            getTitle.innerHTML = data.name

            const getPrice = document.getElementById("price");
            getPrice.innerHTML = data.price

            const getDescription = document.getElementById("description");
            getDescription.innerHTML = data.description

            const getColors = document.getElementById("colors")
            for(color in data.colors){
                getColors.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`
            }

        })
}

getOneArticle()
    

