// On récupère l'url courante avec son "id"
const idProductUrl = new URL(document.location).searchParams.get('id');
const idProductUrlAPI = `http://localhost:3000/api/products/${idProductUrl}`

// Affichage du produit sélectionné depuis la page d'accueil
const getOneArticle = () => {
    fetch(idProductUrlAPI)
        .then(res => res.json())
        .then(data => {
            console.log(data);

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
console.log(idProductUrl);
getOneArticle();

// Evenement > Ecoute du choix de la couleur
let choiceColor = document.getElementById("colors");
choiceColor.addEventListener("input",(e) => {
    choiceColor = e.target.value
    console.log(choiceColor); 
})

// Evenement > Ecoute du choix de la quantité
let choiceQuantity = document.querySelector("#quantity");
choiceQuantity.addEventListener("input", (e) => {
    choiceQuantity = e.target.value
    console.log(choiceQuantity);
})

// Paramétrage du bouton "Ajouter au panier"
const btnAddToCart = document.getElementById("addToCart");
btnAddToCart.addEventListener("click", () => {
    const choiceColor = document.getElementById("colors").value;
    const choiceQuantity = document.getElementById("quantity").value;
    
    const itemIdColorsQuantity = {
        "id": idProductUrl,
        "color": choiceColor, 
        "quantity": parseInt(choiceQuantity)
    };

if(choiceColor != 0 && choiceQuantity > 0 && choiceQuantity < 101 ){
    addProductToCart(itemIdColorsQuantity)
    alert("Votre produit à bien été ajouté au panier")
    
} else {
    alert("Pour valider votre selection vous devez choisir une couleur et une quantité entre 1 et 100")
}   
})

// Function pour sauvegarder les produits dans le panier(localStorage)
// en transformant les datas en chaines de caractère
function saveProductToCart(StockedProducts){
    localStorage.setItem("StockedProducts", JSON.stringify(StockedProducts));
}

// Function pour récuperer les produits du panier(localStorage) / panier vide = tableau
function getProductToCart(){
    let StockedProducts = localStorage.getItem("StockedProducts");
    if (StockedProducts == null){
        return [];
    } else {
        return JSON.parse(StockedProducts);
    }
}

function addProductToCart(product){
// On récupère le panier
    let listProductsInCart = getProductToCart();

//On cherche dans le panier si il y a un produit dont l'id est égale à l'id du produit à ajouter 
    let foundProduct = listProductsInCart.find(element => {
        return element.id == product.id && element.color == product.color;
     });

     if(foundProduct === undefined){
        listProductsInCart.push(product);
     } else {
        foundProduct.quantity += product.quantity;
     } 
// On enregistre le nouveau panier    
    saveProductToCart(listProductsInCart);
}