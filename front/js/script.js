const containerItems = document.getElementById("items");

fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(function(data){
    for(product in data){
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
  
