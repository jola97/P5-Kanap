// On selectionne l'élement "items" de la section de la page index.html
const containerItems = document.getElementById("items");

// On récupère les produits de l'api et on les affichent
async function getAllProducts() {
  await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
      console.table(data);
      for (product in data) {
        containerItems.innerHTML +=
          `<a href="./product.html?id=${data[product]._id}">
                <article>
                    <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
                    <h3 class="productName">${data[product].name}</h3>
                    <p class="productDescription">${data[product].description}</p>
                </article>
          </a>`
      }
    })
    .catch((error) => console.log(error))
}
getAllProducts();
