//******************** Fonction pour récuperer les produits de l'API ********************//
const idProductUrlAPI = "http://localhost:3000/api/products/"
async function getProductsAPI() {
  let responseAPI = await fetch(idProductUrlAPI);
  let listproductsAPI = await responseAPI.json();
  return listproductsAPI;
}

//******************** Fonction pour récuperer les produits du panier (localStorage) ********************//
function getProductsCart() {
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
async function displayCart() {

  const items = await getProductsAPI();
  //const currentLS = [];

  compareItemsLSAPI(items, currentLS)
  console.log(currentLS);

  for (product in currentLS) {
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
  showIds() // Affiche les ids ds la console qui permettra de generer un numéro de commande
  getTotalQuantityProduct() // Affichage de la quantité
  getTotalPriceProduct() // Affichage du prix total
  updateQuantityAndPrice() // Mise à jour de la quantité et du prix total après changement de la quantité
  removeFromCart() // Suppression d'un produit

}
// Appel de la fonction pour afficher le panier
displayCart()

//******************** Calcul et affichage de la quantité total des produits ********************//
function getTotalQuantityProduct() {
  const totalQuantity = document.querySelector("#totalQuantity");
  let nbrProducts = getProductsCart();
  let sum = 0;
  if (nbrProducts) {
    for (let i = 0; i < nbrProducts.length; i++) {
      sum += parseInt(nbrProducts[i].quantity)
      console.log("Quantité initiale : " + parseInt(sum));
      totalQuantity.textContent = parseInt(sum)
    }
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

    console.log("Prix de chaque produit par la quantité : " + items.price + "€" + " x " +
      items.quantity + " quantité(s)" + " = " + resultatPriceQuantity + "€");
  }
  console.log(totalOfEachProduit);
  // On fait la somme des prix affichés dans le tableaux "totalOfEachProduit" avec la fonction reduce

  const sumTotalPriceProduct = totalOfEachProduit.reduce((sumPrice, currentPrice) => {
    return sumPrice + currentPrice
  }, 0);

  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = sumTotalPriceProduct
  console.log("Le prix total de la commande est de " + sumTotalPriceProduct + "€");
}


//******************** Fonction pour supprimer un produit ********************//
async function removeFromCart() {

  //On récupère le localStorage actuelle
  const items = await getProductsAPI();
  const currentLS = [];
  compareItemsLSAPI(items, currentLS)
  console.log(currentLS);

  let deleteItem = document.getElementsByClassName("deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", () => {

      let idSelectDelete = currentLS[i].id
      console.log("L'id sélectionner pour la supression du produit est : " + idSelectDelete);
      let currentLSFilter = currentLS.filter(el => el.id !== idSelectDelete)
      console.log(currentLSFilter);
      saveProductToCart(currentLSFilter)

      // Actualisation de la page
      window.location.reload();
    })
  }
}


//******************** Mise à jour du prix total lors du changement de la quantité ********************//
function updateQuantityAndPrice() {
  const cartIdAndColor = document.querySelectorAll(".cart__item")
  cartIdAndColor.forEach((cartIdAndColor) => {
    cartIdAndColor.addEventListener("change", (e) => {
      let cartCurrent = JSON.parse(localStorage.getItem("StockedProducts"));
      for (product of cartCurrent) {
        if (
          product.id === cartIdAndColor.dataset.id &&
          product.color === cartIdAndColor.dataset.color
        ) {
          product.quantity = e.target.value;
          if (product.quantity > 1 && product.quantity < 101){
          localStorage.StockedProducts = JSON.stringify(cartCurrent);
          cartIdAndColor.dataset.quantity = e.target.value
          console.log("id : " + product.id + " - color : " + product.color + " quantité : " + e.target.value);
          getTotalPriceProduct()
          getTotalQuantityProduct()
          } else {
            alert("Pour valider votre selection vous devez choisir une quantité entre 1 et 100")
          }
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

/***************************************************************************************************************/
/********************************************** FORMULAIRE *****************************************************/
/***************************************************************************************************************/

//******************** Fistname & firstName message error ********************//
// Déclare variable pour le controle des noms, prénoms et ville
let inputFirstNamelastNameCityRegExp = new RegExp(/^[a-zA-ZÀ-ÿ]{2,20}(?:[\s-][a-zA-ZÀ-ÿ]+)*$/)

let inputFirstName = document.getElementById("firstName")
inputFirstName.addEventListener("change", function () {
  inputFirstNameControl(this)
})

let inputFirstNameErrorMsg = document.getElementById("firstNameErrorMsg")

// On crée une fonction pour vérifier le prénom en utilisant le RegExp
let inputFirstNameControl = (inputFirstName) => {
  // On teste le nom
  if (inputFirstName.value.trim() == "") {
    inputFirstNameErrorMsg.innerText = "Le champs prénom est requis"
    inputFirstNameErrorMsg.style = "color : none"
    return false
  } else if (inputFirstNamelastNameCityRegExp.test(inputFirstName.value) == false) {
    inputFirstNameErrorMsg.innerText = "Les chiffres et les symboles ne sont pas autorisés"
    inputFirstNameErrorMsg.style = "color : none"
    return false
  } else {
    inputFirstNameErrorMsg.innerText = "Correct"
    inputFirstNameErrorMsg.style = "color : #33cc33"
    return true
  }
}

//******************** lastName & lastName message error ********************//
let inputlastName = document.getElementById("lastName")
inputlastName.addEventListener("change", function () {
  inputlastNameControl(this)
})

let inputlastNameErrorMsg = document.getElementById("lastNameErrorMsg")
// On crée une fonction pour vérifier le prénom en utilisant le RegExp
let inputlastNameControl = (inputlastName) => {
  // Vérification de l'input : valeur vide ou présence de caractères non autorisés
  if (inputlastName.value.trim() == "") {
    inputlastNameErrorMsg.innerText = "Le champs nom est requis"
    inputlastNameErrorMsg.style = "color : none"
    return false
  } else if (inputFirstNamelastNameCityRegExp.test(inputlastName.value) == false) {
    inputlastNameErrorMsg.innerText = "Les chiffres et les symboles ne sont pas autorisés"
    inputlastNameErrorMsg.style = "color : none"
    return false
  } else {
    inputlastNameErrorMsg.innerText = "Correct"
    inputlastNameErrorMsg.style = "color : #33cc33"
    return true
  }
}

//******************** Address & Address message error ********************//
let inputAddress = document.getElementById("address");
inputAddress.addEventListener("change", function () {
  inputAddressControl(this);
})

let inputAddressErrorMsg = document.getElementById("addressErrorMsg")

let inputAddressControl = (inputAddress) => {
  let inputAddressRegExp = new RegExp(/^[a-zA-Z0-9À-ÿ\'\,]+(?:[\s-][a-zA-Z0-9À-ÿ\'\,]+)*$/)
  if (inputAddress.value.trim() == "") {
    inputAddressErrorMsg.innerText = "Le champs adresse est requis"
    inputAddressErrorMsg.style = "color : none"
    return false
  } else if (inputAddressRegExp.test(inputAddress.value) == false) {
    inputAddressErrorMsg.innerText = "Les chiffres et les symboles ne sont pas autorisés"
    inputAddressErrorMsg.style = "color : none"
    return false
  } else {
    inputAddressErrorMsg.innerText = "Correct"
    inputAddressErrorMsg.style = "color : #33cc33"
    return true
  }
}

//******************** City & City message error ********************//
let inputCity = document.getElementById("city");
inputCity.addEventListener("change", function () {
  inputCityControl(this);
});

let inputCityErrorMsg = document.getElementById("cityErrorMsg")

// On crée une fonction pour vérifier le nom de la ville en utilisant le RegExp
let inputCityControl = (inputCity) => {
  // On teste le nom
  if (inputCity.value.trim() == "") {
    inputCityErrorMsg.innerText = "Le champs Ville est requis"
    inputCityErrorMsg.style = "color : none"
    return false
  } else if (inputFirstNamelastNameCityRegExp.test(inputCity.value) == false) {
    inputCityErrorMsg.innerText = "Les chiffres et les symboles ne sont pas autorisés"
    inputCityErrorMsg.style = "color : none"
    return false
  } else {
    inputCityErrorMsg.innerText = "Correct"
    inputCityErrorMsg.style = "color : #33cc33"
    return true
  }
}

//******************** Email & Email message error ********************//
let inputEmail = document.getElementById("email")
inputEmail.addEventListener("change", function () {
  inputEmailControl(this);
});

let inputEmailErrorMsg = document.getElementById("emailErrorMsg")

// On crée une fonction pour vérifier l'adresse email en utilisant le RegExp
const inputEmailControl = (inputEmail) => {
  let inputEmailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i)
  // On teste l'adresse email
  if (inputEmail.value.trim() == "") {
    inputEmailErrorMsg.innerText = "Le champs email est requis"
    inputEmailErrorMsg.style = "color : none"
    return false
  } else if (inputEmailRegExp.test(inputEmail.value) == false) {
    inputEmailErrorMsg.innerText = "Les chiffres et les symboles ne sont pas autorisés"
    inputEmailErrorMsg.style = "color : none"
    return false
  } else {
    inputEmailErrorMsg.innerText = "Correct"
    inputEmailErrorMsg.style = "color : #33cc33"
    return true
  }
}

//******************** Remplissage du formulaire automatiquement ********************//
// On récupère les données du formulaire dans le localStorage
const dataLSUserInformation = localStorage.getItem("userInformation")

// Transforme "dataLSUserInformation" en objet
const dataLSUserInformationObj = JSON.parse(dataLSUserInformation)

// Fonction qui permet de garder en mémoire les input du formulaire meme en changeant de page 
function autoInputForm(input) {
  if (dataLSUserInformation == null) {
    console.log("Pas d'utilisateur dans le localStorage");
  } else {
    document.querySelector(`#${input}`).value = dataLSUserInformationObj[input];
  }
}
autoInputForm("firstName");
autoInputForm("lastName");
autoInputForm("address");
autoInputForm("city");
autoInputForm("email");

//******************** Récupération des IDs dans le localStorage ********************//
let arrayIdLS = [];
function showIds() {
  let cartlistIds = document.querySelectorAll(".cart__item")
  cartlistIds.forEach(cartlistIds => {
    console.log("Id du produit : "+cartlistIds.dataset.id);
    return arrayIdLS.push(cartlistIds.dataset.id)
  })
}

console.log(arrayIdLS);
//******************** Bouton "Commander" ********************//
// On ajoute un évènement sur le bouton "Commander"
const btnOrder = document.getElementById("order")
btnOrder.addEventListener("click", (e) => {
  e.preventDefault();

  // On crée un objet avec les renseignements de l'acheteur
  const userInformation = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  }
  console.log(userInformation)
  // On vérifie la validité des inputs du formulaire avant enregistrement dans le LS
  if (inputFirstNameControl(inputFirstName) &&
    inputlastNameControl(inputlastName) &&
    inputAddressControl(inputAddress) &&
    inputCityControl(inputCity) &&
    inputEmailControl(inputEmail)
  ) {
    // On enregistre les renseignements de l'acheteur dans le localStorage
    localStorage.setItem("userInformation", JSON.stringify(userInformation))
  } else {
    return alert("Veuillez bien remplir le formulaire")
  }

  // Envoi du formulaire et des articles au serveur
  function sendInfoToServ() {
    const infoContactProduct = {
      contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
      },
      products: arrayIdLS
    }
    return infoContactProduct
  }

  // On envoi le formulaire et les articles sur le serveur qui retourne un numéro de commande
  const infoToServ = sendInfoToServ()
  fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    body: JSON.stringify(infoToServ),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      location.href = `confirmation.html?orderId=${data.orderId}`
    })
    .catch((err) => {
      console.error(err);
      alert("erreur :" + err);
    })
})



