//vérifier si la page est chargée
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", charge);
}

else {
    charge();
}

function charge() {
    let boutonsRetirer = document.getElementsByClassName("panier-retirer");
    for (let i = 0; i < boutonsRetirer.length; i++) {
        let bouton = boutonsRetirer[i];
        bouton.addEventListener("click", retirerItem);        
    }

    let boutonsQuantite = document.getElementsByClassName("panier-quantite");
    for (let i = 0; i <boutonsQuantite.length; i++) {
        let bouton = boutonsQuantite[i];
        bouton.addEventListener("change", quantiteChange);
    }

    let boutonsAjouter = document.getElementsByClassName("panier-ajouter");
    for (let i = 0; i < boutonsAjouter.length; i++) {
        let bouton = boutonsAjouter[i];
        bouton.addEventListener("click", ajouterAuPanier);
    }
}

function retirerItem(event) {

    let boutonAppuye = event.target;
    boutonAppuye.parentElement.parentElement.remove();
    updateTotal();
}

function quantiteChange(event) {
    //recuperer l'input qui a callé
    let input = event.target;

    //s'assurer que l'utilisateur mette une valeur correcte
    if (isNaN(input.value) || input.value <= 1) {
        input.value = 1;
    }
    updateTotal();
}

//récupération de l'item clické
function ajouterAuPanier(event) {
    alert("La commande de produits est désactivée pour une durée indéterminée. Pour plus d'information, contactez farcesdescantons@gmail.com");
    // let bouton = event.target;

    // //reference a la figure
    // let itemMagasin = bouton.parentElement.parentElement.parentElement.parentElement;
    
    // let titre = itemMagasin.getElementsByClassName("magasin-titre")[0].innerText;
    // let sousTitre = itemMagasin.getElementsByClassName("magasin-sous-titre")[0].innerText;
    // let prix;
    // let imageSource = itemMagasin.getElementsByClassName("magasin-image")[0].src;

    // let options;

    // // Quantité genre "500g" ou "250ml"
    // let quantite = itemMagasin.getElementsByClassName("magasin-quantite")[0].innerText;

    // // Quantité pour le nombre de fois que le client veux le produit
    // let quantiteDesiree = itemMagasin.getElementsByClassName("magasin-quantite-desiree")[0].value;

    // if (itemMagasin.contains(itemMagasin.getElementsByTagName("select")[0])) {
    //     options = itemMagasin.getElementsByTagName("select")[0].children;
    // }

    // else {
    //     prix = itemMagasin.getElementsByClassName("magasin-prix")[0].innerText;
    // }

    // creerElementPanier(titre, sousTitre, prix, imageSource, options, itemMagasin, quantite, quantiteDesiree);
    // updateTotal();
}

//création de l'item clické dans le panier
function creerElementPanier(titre, sousTitre, prix, imageSource, options, itemMagasin, quantite, quantiteDesiree) {
    //////////////////////////////////////////////////////////trouver ou mettre l'item selectionne ainsi que determiner s'il est deja dans le paneir
    //balises HTML que doit contenir un item X
    let panierContenu;

    let panier = document.getElementById("panier");
    //un item du panier
    let panierItem = document.createElement("div");
    panierItem.classList.add("panier-item");
    panierItem.classList.add("carte-conteneur");
    let siAjouter = true;
    //////////////////////////////////////////////////////////seulement définir options si le produit sélectionné a des options
    if (itemMagasin.contains(itemMagasin.getElementsByTagName("select")[0])) {

        //s'il contient
        //verifier si chacun est selectionné
        //s'il l'est, on le recupere
        for (i = 0; i < options.length; i++) {
            let option = options[i];

            if (option.selected) {
                //trouver l'index du •.
                //le prix des options se trouvera toujours apres le bullet point, ce qui permet de recupere uniquement le prix
                let texteOption = option.innerText;
                let indexBulletPoint = texteOption.indexOf("•");
                

                let titreOption = texteOption.substr(0, indexBulletPoint);
                //ajouter 2 pour enlever le • et l'espace apres
                let prixOption = texteOption.substr(indexBulletPoint + 2);
                
                //facon optimale
                //prixOption = option.getElementsByTagName("span")[0].innerText;
                //////////////////////////////////////////////////////////////////// CE QUI EST ÉCRIT DANS LE PANIER SI L'ITEM CHOISI A DES OPTIONS
                panierContenu = `
                        <div class="panier-item-infos carte">
                            <h3 class=panier-titre>${titre + " " + titreOption.charAt(0).toLowerCase() + titreOption.substring(1)}</h3>
                            <h4 class=panier-sous-titre>${sousTitre}</h4>
                            <p class=panier-quantite-item>${quantite}</h4>
                            <p class=panier-prix-unitaire>${prixOption}</p>
                            <input class=panier-quantite type="number" min="1" max="100" value=${quantiteDesiree}>
                        </div>
                        <img src="${imageSource}" alt="default">
                        <button class="panier-retirer"><i class="fas fa-times-circle icone agrandir-hover"></i></button>
                    `;

                //détecter si un item est deja dans le panier ou nom, avec les options
                let panierItemNoms = document.getElementsByClassName("panier-titre");
                for (let i = 0; i < panierItemNoms.length; i++) {
                    if ((titre + " " + titreOption).includes(panierItemNoms[i].innerText)) {
                        siAjouter = false;
                    }
                }
            }
        }
    }

    ///////////////////////////////////////////////////////////dans le cas ou il n'y a pas d'options
    else {
        //un string de balises HTML contenant tout ce qui est necessaire pour creer un item dans le panier
        panierContenu = `
            <div class="panier-item-infos carte">
                <h3 class=panier-titre>${titre}</h3>
                <h4 class=panier-sous-titre>${sousTitre}</h4>
                <p class=panier-quantite-item>${quantite}</h4>
                <p class=panier-prix-unitaire>${prix}</p>
                <input class=panier-quantite type="number" min="1" max="100" value=${quantiteDesiree}>
        </div>
        <img src="${imageSource}" alt="default">
        <button class="panier-retirer"> <i class="fas fa-times-circle icone agrandir-hover"></i></button>
        `;

        //détecter si un item est deja dans le panier ou nom, sans les options
        let panierItemNoms = document.getElementsByClassName("panier-titre");
        for (let i = 0; i < panierItemNoms.length; i++) {
            if (panierItemNoms[i].innerText.includes(titre)) {
                siAjouter = false;
            }
        }
    }

    //si un item n'a pas mis siAjouter a false, ca veut dire qu'il n'est pas encore dans le panier
    popUp(titre, siAjouter);

    if (siAjouter) {
        panierItem.innerHTML = panierContenu;
        panier.append(panierItem);
    }

    //on remet a true, sinon il resterait toujours a false
    siAjouter = true;
}

///////////////////////////////////////////////////////////////////////////////////////////// FENETRES POP UP
function popUp(item, dejaPanier) {
    let fenetrePopUp = document.getElementsByClassName("panier-popup")[0];
    fenetrePopUp.classList.add("panier-popup-active");

    if (!dejaPanier) {
        fenetrePopUp.innerText = item + " est déjà dans le panier!";
    }

    else {
        fenetrePopUp.innerHTML = item + " a été ajouté au panier!";
    }

    setTimeout(enleverPopUp, 3000);
}

function enleverPopUp() {
    let fenetrePopUp = document.getElementsByClassName("panier-popup")[0];
    fenetrePopUp.classList.remove("panier-popup-active");
}

function updateTotal() {
    let panier = document.getElementById("panier");
    let items = panier.getElementsByClassName("panier-item");
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        //if pour faire en sorte que le total soit 0 si on enleve tous les items
        if (items.length > 0) {
            let item = items[i];

            //prix pour chaque item
            let prixElement = item.getElementsByClassName("panier-prix-unitaire")[0];

            //enlever le signe de $
            //remplacer la virgule par un point
            //transformer le string en float
            let prix = parseFloat(prixElement.innerText.replace("$", "").replace(",", "."));
            let quantiteElement = item.getElementsByClassName("panier-quantite")[0];
            let quantite = quantiteElement.value;

            //update le total
            total = total + (prix * quantite);
        }

        else {
            total = 0;
        }
    }

    //arrondir
    total = Math.round(total * 100) / 100;
    document.getElementById("panier-total").innerText = "Total: " + total + "$";

    charge();

    let elementsACacher = document.getElementsByClassName("panier-cacher");

    for (let i = 0; i < elementsACacher.length; i++) {
        let element = elementsACacher[i];

        if (items.length > 0) {
            element.style.display = "flex";
        }
    
        else {
            element.style.display = "none";
        }
    }
}

function typeLivraison() {
    let type = document.getElementById("type-livraison").value;
    let informations = document.getElementById("info-courriel");

    if (type == "livraison") {
        informations.innerHTML = `
            <div class=adresse>
                <label for="ville">Ville</label>
                <input type="text" id=ville>
            </div>
    
            <div class=adresse>
                <label for="adresse">Numéro d'adresse et rue</label>
                <input type="text" id=adresse>
            </div>

            <div class=adresse>
                <label for="appt">Numéro d'apartemment</label>
                <input type="text" id=appt>
            </div>

            <div class=date>
                <label for="date">Date de livraison désirée</label>
                <input type="date" id=date>
            </div>

            <div class=noms>
                <label for="prenom">Prénom</label>
                <input type="text" id=prenom>
            </div>

            <div class=noms>    
                <label for="nom">Nom</label>
                <input type="text" id=nom>
            </div>

            <div class="infos">
                <label for="courriel">Adresse électronique (courriel)</label>
                <input type="email" id=courriel>
            </div>

            <div class="infos">
                <label for="telephone">Téléphone</label>
                <input type="tel" id=telephone>
            </div>

            <div>
                <label for="commentaires">Commentaires (spécifications)</label>
                <textarea name="commentaires" id="commentaires" cols="30" rows="5"></textarea>
            </div>`
    }

    else {
        informations.innerHTML = `
            <div class=date>
                <label for="date">Date de cueillette désirée</label>
                <input type="date" id=date>
            </div>

            <div class=noms>
                <label for="prenom">Prénom</label>
                <input type="text" id=prenom>
            </div>

            <div class=noms>    
                <label for="nom">Nom</label>
                <input type="text" id=nom>
            </div>

            <div class="infos">
                <label for="courriel">Adresse électronique (courriel)</label>
                <input type="email" id=courriel>
            </div>

            <div class="infos">
                <label for="telephone">Téléphone</label>
                <input type="tel" id=telephone>
            </div>

            <div>
                <label for="commentaires">Commentaires (spécifications)</label>
                <textarea name="commentaires" id="commentaires" cols="30" rows="5"></textarea>
            </div>
        `
    }
}

function acheter() {
    let type = document.getElementById("type-livraison").value;

    let informations;
    let body;

    if (type == "cueillette") {
        informations = {
            prenom: document.getElementById("prenom").value,
            nom: document.getElementById("nom").value,
            date: document.getElementById("date").value,
            courriel: document.getElementById("courriel").value,
            telephone: document.getElementById("telephone").value,
            commentaires: document.getElementById("commentaires").value,
        }

        body = `Client: ${informations.prenom + " " + informations.nom}
        %0D%0A
        %0D%0A Date de cueillette désirée: ${informations.date}
        %0D%0A
        %0D%0A Spécifications/commentaires: ${informations.commentaires}
        %0D%0A
        %0D%0A Produits désirés: %0D%0A`;
    }

    if (type == "livraison") {
        informations = {
            adresse: document.getElementById("adresse").value,
            ville: document.getElementById("ville").value,
            appt: document.getElementById("appt").value,
            prenom: document.getElementById("prenom").value,
            nom: document.getElementById("nom").value,
            date: document.getElementById("date").value,
            courriel: document.getElementById("courriel").value,
            telephone: document.getElementById("telephone").value,
            commentaires: document.getElementById("commentaires").value,
        }

        body = `Client: ${informations.prenom + " " + informations.nom}
        %0D%0A
        %0D%0A Adresse: ${informations.adresse}, appartement ${informations.appt}, à ${informations.ville}
        %0D%0A
        %0D%0A Date de livraison désirée: ${informations.date}
        %0D%0A
        %0D%0A Spécifications/commentaires: ${informations.commentaires}
        %0D%0A
        %0D%0A Produits désirés: %0D%0A`;
    }
    
    let itemsCommandes = document.getElementsByClassName("panier-titre");
    let quantitesCommandes = document.getElementsByClassName("panier-quantite");
    let prixCommandes = document.getElementsByClassName("panier-prix-unitaire");
    let total = document.getElementById("panier-total").innerText;

    for (let i = 0; i < itemsCommandes.length; i++) {
        let item = itemsCommandes[i].innerText;
        let quantite = parseFloat(quantitesCommandes[i].value);
        let prix = parseFloat(prixCommandes[i].innerText.replace(",", "."));

        body += "    • " + quantite + " " + item + " " + " - " + quantite * prix + "$%0D%0A%0D%0A%0D%0A";
    }

    body += total;

    let navigateur = navigator.userAgent;
    if (navigateur.includes("Safari") || navigateur.includes("safari")) {
        body = "<html> %0D%0A%0D%0A" + body + "%0D%0A%0D%0A </html>"
    }
    
    verifierInfos(informations.date, body, informations);
}

function verifierInfos(dateInput, body, informations) {
    let date = new Date(dateInput);
    let dateAjd = new Date();

    // Vérifier si la date est valide
    if (dateAjd <= date) {
        //si oui, on vérifie que diverses informations se trouvant dans cueillette et dans livraison sont valides
        if (!informations.prenom || !informations.nom || !informations.telephone || !informations.courriel || !informations.telephone) {
            alert("Veuillez entrer toutes les informations nécéssaires");
        }

        //si oui, on vérifie si les informations de livraison sont valides
        else {
            // Vérifier si l'addresse courriel contient un @ et un .
            if (!informations.courriel.includes("@") || !informations.courriel.includes(".")) {
                alert("Veuillez entrer une addresse courriel correcte");
            }

            else {
                let type = document.getElementById("type-livraison").value;

                if (type == "livraison") {
                    if (!informations.adresse || !informations.ville) {
                        alert("Veuillez entrer les données de localisation")
                    }

                    else {
                        envoyerCourriel(body);
                    }
                }

                else {
                    envoyerCourriel(body);
                }
            }
        }
    }

    else {
        alert("Veuillez sélectionner une date valide");
    }

    body.replace("<BR>", "%0D%0A");
}

function envoyerCourriel(body) {
    window.open(`mailto:farcesdescantons@gmail.com
                ?subject=Achat de farces des cantons
                &body=${body}`);
}
