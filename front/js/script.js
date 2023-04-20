// Récupération des produits depuis le fichier "Product.js"
const reponse = await fetch('http://localhost:3000/api/products');
const products = await reponse.json();

for (let i=0 ; i<products.length ; i++){

    const product = products[i];

    // Récupération de l'élément du DOM qui accueillera les items
    const sectionItems = document.querySelector(".items");

    // Création d’une balise dédiée à produit
    const articleItems = document.createElement("article");

    // Création des balises
    const imageProduct = document.createElement("img");
    imageProduct.src = product.imageUrl;

    const productName = document.createElement("h3");
    productName.innerText = product.name;

    const productDescription = document.createElement("p");
    productDescription.innerText = product.description;


    // On rattache la balise product a la section Items
    sectionItems.appendChild(articleItems);
    articleItems.appendChild(imageProduct);
    articleItems.appendChild(productName);
    articleItems.appendChild(productDescription);
}