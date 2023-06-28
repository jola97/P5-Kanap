const idProductUrlAPI = "http://localhost:3000/api/products/"


//******************** Fonction pour récuperer les produits de l'API ********************//
async function getProductsAPI(){
    let responseAPI = await fetch(idProductUrlAPI);
    let listproductsAPI = await responseAPI.json();
        return listproductsAPI;
}

//******************** Fonction pour récuperer les produits du panier (localStorage) ********************//
function getProductsCart(){
  return JSON.parse(localStorage.getItem("StockedProducts"));
}

/**********************
 * On compare les éléments de l'API avec ceux du LS pat l'id pr récuperer
 * toutes les informations de chaque produit
 * @param {Object []} item 
 * @param {Object []} cartProductItems 
 * 
 */
function compareItemsLSAPI(item, cartProductItems) {
  let listLS = getProductsCart();
  
  if (listLS != null) {
    for (let i = 0; i < listLS.length; i++) {
      const itemIdLS = listLS[i].id;
      const foundAPI = item.find(element => element._id == itemIdLS);
      
      cartProductItems.push({
        'id': foundAPI._id,
        'name': foundAPI.name,
        'color': listLS[i].color,
        'price': foundAPI.price,
        'imgUrl': foundAPI.imageUrl,
        'altTxt': foundAPI.altTxt,
        'quantity': listLS[i].quantity        
      })
    }
  }
}

const currentLS = [];
console.log(currentLS);

//******************** On affiche les produits du panier en le parcourant ********************//
async function displayCart(){

  const items = await getProductsAPI();
  //const currentLS = [];

  compareItemsLSAPI(items, currentLS)
  console.log(currentLS);
  
  for (product in currentLS){
    const containerCartItems = document.getElementById("cart__items")
    containerCartItems.innerHTML += `<article class="cart__item" data-id="${currentLS[product].id}" data-color="${currentLS[product].color}">
                <div class="cart__item__img">
                  <img src="${currentLS[product].imgUrl}" alt="${currentLS[product].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${currentLS[product].name}</h2>
                    <p>${currentLS[product].color}</p>
                    <p>${currentLS[product].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${currentLS[product].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
  }
  getTotalQuantityProduct()
  getTotalPriceProduct() // Affichage du prix total
  updateQuantityAndPrice() // Mise à jour de la quantité et du prix total après changement de la quantité
  removeFromCart() // Suppression d'un produit
  
}
// Appel de la fonction pour afficher le panier
displayCart()

//******************** Calcul et affichage de la quantité total des produits ********************//

//totalQuantity.innerText = getTotalQuantityProduct()

function getTotalQuantityProduct() {
  const totalQuantity = document.querySelector("#totalQuantity");
  let nbrProducts = getProductsCart();
  let sum = 0;

  for(let i = 0 ; i < nbrProducts.length; i++){
    sum += parseInt(nbrProducts[i].quantity)
    console.log(parseInt(sum));
    totalQuantity.textContent = parseInt(sum)
  }
}

//******************** Calcul du prix total de chaque produit et Affichage du prix total des produits ********************//
async function getTotalPriceProduct() {
  let items = await getProductsAPI();
  let currentLS = [];
  let totalOfEachProduit = [];

  compareItemsLSAPI(items, currentLS)
  // On boucle dans le nouveau tableau du LS pr récuperer le prix et la quantité
  for (items of currentLS) {
    let resultatPriceQuantity = items.price * items.quantity
    totalOfEachProduit.push(resultatPriceQuantity)

    console.log("Prix de chaque produit par la quantité : "+items.price + "€" + " x " +
     items.quantity + " quantité(s)" + " = " + resultatPriceQuantity + "€");
  }
  console.log(totalOfEachProduit);
  // On fait la somme des prix affichés dans le tableaux "totalOfEachProduit" avec la fonction reduce
  
  const sumTotalPriceProduct = totalOfEachProduit.reduce((sumPrice, currentPrice) => {
  return sumPrice + currentPrice
     }, 0);

  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = sumTotalPriceProduct
  console.log("Le prix total de la commande est de " + sumTotalPriceProduct +"€" );
}


//******************** Fonction pour supprimer un produit ********************//
async function removeFromCart(){

  //On récupère le localStorage actuelle
  const items = await getProductsAPI();
  const currentLS = [];
  compareItemsLSAPI(items, currentLS)
  console.log(currentLS);

  let deleteItem = document.getElementsByClassName("deleteItem");
    for (let i=0 ; i < deleteItem.length; i++){
    deleteItem[i].addEventListener("click", ()=>{

      let idSelectDelete = currentLS[i].id
      console.log("L'id sélectionner pour la supression du produit est : " + idSelectDelete);
      let currentLSFilter = currentLS.filter(el => el.id !== idSelectDelete)
      console.log(currentLSFilter);
      saveProductToCart(currentLSFilter)

      // Actualisation de la page
      window.location.reload() ;
    })
  }
}


//******************** Mise à jour du prix total lors du changement de la quantité ********************//

function updateQuantityAndPrice(){
  const cartIdAndColor = document.querySelectorAll(".cart__item")
  cartIdAndColor.forEach((cartIdAndColor) => {
    cartIdAndColor.addEventListener("change", (e) => {
      let cartCurrent = JSON.parse(localStorage.getItem("StockedProducts"));
      for(product of cartCurrent){
        if(
          product.id === cartIdAndColor.dataset.id &&          
          product.color === cartIdAndColor.dataset.color
          ) {
          product.quantity = e.target.value;
          localStorage.StockedProducts = JSON.stringify(cartCurrent);
          cartIdAndColor.dataset.quantity = e.target.value
          console.log("id : " + product.id + " - color : " + product.color + " quantité : " + e.target.value);
          getTotalPriceProduct()
          getTotalQuantityProduct()
        } 
      }
    })
  });
}


//******************** Function pour sauvegarder les produits dans le panier(localStorage) ********************//
// en transformant les datas en chaines de caractère
function saveProductToCart(StockedProducts) {
    localStorage.setItem("StockedProducts", JSON.stringify(StockedProducts));
}