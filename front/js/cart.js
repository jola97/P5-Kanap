// // On récupère l'url courante avec son "id"
// const idProductUrl = new URL(document.location).searchParams.get('id');
// const idProductUrlAPI = `http://localhost:3000/api/products/${idProductUrl}`

// const cartContainerItems = document.getElementById("cart__items");

// let getCart = JSON.parse(localStorage.getItem("storedProducts"));

// fetch("http://localhost:3000/api/products")
//     .then(res => res.json())
//     .then(function (storedProducts) {
//         if(getCart){
//             for(products of storedProducts)
//             cartContainerItems.innerHTML +=
//                 `<article class="cart__item" data-id="${[products._id]}" data-color="{product-color}">
//                 <div class="cart__item__img">
//                   <img src="${[products.imageUrl]}" alt="${[products.altTxt]}">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__description">
//                     <h2>${[products.name]}</h2>
//                     <p>Vert</p>
//                     <p>${[products.price]} €</p>
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article>`
//         } else {

//         }
//         // for (product in data) {
//         //     cartContainerItems.innerHTML +=
//         //         `<article class="cart__item" data-id="${data[product]._id}" data-color="{product-color}">
//         //         <div class="cart__item__img">
//         //           <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
//         //         </div>
//         //         <div class="cart__item__content">
//         //           <div class="cart__item__content__description">
//         //             <h2>${data[product].name}</h2>
//         //             <p>Vert</p>
//         //             <p>${data[product].price} €</p>
//         //           </div>
//         //           <div class="cart__item__content__settings">
//         //             <div class="cart__item__content__settings__quantity">
//         //               <p>Qté : </p>
//         //               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//         //             </div>
//         //             <div class="cart__item__content__settings__delete">
//         //               <p class="deleteItem">Supprimer</p>
//         //             </div>
//         //           </div>
//         //         </div>
//         //       </article>`
//         //}
//     })
//     .catch((error) => console.log(error))


    