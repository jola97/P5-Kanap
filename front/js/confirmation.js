// On récupère l' OrderId de l'URL
let getOrderId = new URLSearchParams(location.search).get('orderId');

// On affiche le numéro de commande sur la page "confirmation.html"
document.getElementById("orderId").innerText = getOrderId;
console.log(document.getElementById("orderId").innerText = getOrderId);

// Vide du localStorage
localStorage.clear();
