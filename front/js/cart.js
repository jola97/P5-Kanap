const containerCartItems = document.getElementById("cart__items");
const containerCartItemsTotalQuantity = document.getElementById("totalQuantity");
const containerCartItemsTotalPrice = document.getElementById("totalPrice");
const idProductUrlAPI = "http://localhost:3000/api/products/"




// On affiche les produits du localstorage en comparant 
//les id de l'API et du local strorage
const viewProductsInCart = () => {
let listProductsInCart = getProductToCart();
let listProductsInAPI = getProductInAPI();
console.log(listProductsInAPI);
console.log(listProductsInCart);
    
}


// Fonction pour récuperer les produits dans l'API
function getProductInAPI(){
  fetch(idProductUrlAPI)
      .then(res => res.json())
      .then(data => {
        for (product in data) {
          console.log(data[product]._id);
        }
    })
}

 function getProductToCart(){
  let stockedProducts = localStorage.getItem("StockedProducts");
   
  if(stockedProducts === null){
    return [];
  } else {
    for (item in stockedProducts){
    return JSON.parse(stockedProducts);
    }
  }
}



// Fonction pour récuperer les produits dans le localstorage
// function getProductToCart(){
//   let stockedProducts = localStorage.getItem("StockedProducts");
//   if(stockedProducts == null){
//     return [];
//   } else {
//     return JSON.parse(stockedProducts); 
//   }
// }

// Function pour sauvegarder les produits dans le panier(localStorage)
// en transformant les datas en chaines de caractère
function saveProductToCart(StockedProducts) {
    localStorage.setItem("StockedProducts", JSON.stringify(StockedProducts));
}


function addProductToCart(product) {
    // On récupère le panier
    let listProductsInCart = getProductToCart();

    //On cherche dans le panier si il y a un produit dont l'id est égale à l'id du produit à ajouter 
    let foundProduct = listProductsInCart.find(element => {
        return element.id == product.id && element.color == product.color;
    });

    if (foundProduct === undefined) {
        listProductsInCart.push(product);
    } else {
        foundProduct.quantity += product.quantity;
    }
    // On enregistre le nouveau panier    
    saveProductToCart(listProductsInCart);
}