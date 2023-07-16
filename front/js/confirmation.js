// On récupère l' OrderId de l'URL
let getOrderId = new URLSearchParams(location.search).get('orderId');
console.log(getOrderId);

// On affiche le numéro de commande sur la page "confirmation.html"
let orderId = document.getElementById("orderId")
orderId.innerText = getOrderId

console.log("Votre numéro de commande est : " + getOrderId);

// Vide du localStorage
localStorage.clear();
