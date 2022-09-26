document.addEventListener("DOMContentLoaded", function() {
    trouver();
});

function trouver() {
    let boutonsPanier = document.getElementsByClassName("panier-ajouter");
    for (bouton of boutonsPanier) {
        bouton.addEventListener("click", "trouverTitres");
        bouton.addEventListener("click", "trouverSousTitres");
    }
}

function trouverTitres() {
    let titres = document.getElementsByClassName("panier-titre");

    for (let titre of titres) {
        if (titre.document.style.height >= titre.document.style.fontSize) {
            titre.document.style.fontSize -= "5em";
        }
    }
}

function trouverSousTitres() {
    let sousTitres = document.getElementsByClassName("panier-sous-titre");

    for (let sousTitre of sousTitres) {
        console.log(sousTitre.length);
        if (sousTitre.length >= 1) {
            console.log("allo");
            sousTitre.style.color = "red";
        }
    }
}