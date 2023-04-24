// Récupération des produits depuis le fichier "Product.js"
const urlProducts = "http://localhost:3000/api/products";
const container = document.getElementById("items");

const getProducts = () => {
    fetch(urlProducts)
    .then(function(res) {
        return res.json()
    })
    .then(function (products) {
        for(product in products) {
            container.innerHTML += `<a href="${products[product]._id}">
            <article>
              <img src="${products[product].imageUrl}" alt="${products[product].altTxt}">
              <h3 class="productName">${products[product].name}</h3>
              <p class="productDescription">${products[product].description}</p>
            </article>
          </a>`
        }
    })
}

getProducts();
