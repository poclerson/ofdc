<?php 
    $page = "produits"; 
    include('header.php');

    # Array associatif des produits
    $listeSections = json_decode(file_get_contents("data/produits.json"), true);

?>
    <main>
        <h1>Produits</h1>
        <section id=produits>
            <!-- Début du loop poru chaque section -->
            <?php foreach ($listeSections as $titreSection => $section) : ?>
            <div id="nouveautes" class="direction-menu"></div>
            <section class=categorieProduit>
                <div>
                    <h2 class=titreApercu><?= $titreSection; ?></h2>
                </div>
                <div class="produits">
                    <!-- Début du loop pour chaque article -->
                    <?php foreach ($section as $produit) : ?>
                    <figure class=item>
                        <input type="radio" id=checkbox-<?= $produit["nom"] ?> class="ouvrir-info" name = "produit-ouvert">
                        <label for="checkbox-<?= $produit["nom"] ?>" class=apercu>
                            <img class=agrandir-hover src="<?php echo "../images/" . $titreSection . "/" . $produit["nom"] . ".jpg" ?>" alt="Photo de <?= $produit['nom']; ?>">
                            <h5 class="magasin-caption"><?= $produit["titre"]; ?></h5>
                        </label>
                        <!-- Générer ce code seulement si le produit est une nouveauté -->
                        <?php if ($produit["nouveaute"]) : ?>
                            <div class="magasin-nouveaute">
                                <h3>Nouveau</h3>
                            </div>
                        <?php endif; ?>
                        <!-- Boite d'information qui s'ouvre quand on clique sur un produit -->
                        <div class="boite-info">
                            <div class="contenu">
                                <form class="magasin-info">
                                    <div class="magasin-info-texte">
                                        <h2 class="magasin-titre"><?= $produit["titre"] ?></h2>
                                        <h4 class="magasin-sous-titre"><?= $produit["sousTitre"]; ?></h4>
                                        <div class="magasin-info-quantite">
                                            <h4 class=magasin-quantite><?= $produit["quantite"]; ?></h4>
                                            <input type="number" min="1" max="100" value="1" class="magasin-quantite-desiree">
                                        </div>

                                        <!-- Générer ce code seulement si le produit a des options -->
                                        <?php if ($produit["options"] != null) : ?>
                                            <select class=magasin-choisir-option name="variete">
                                                <!-- Début du loop pour chaque saveur -->
                                                <?php foreach ($produit['options'] as $option) : ?>
                                                    <option value="<?= $option["valeur"]; ?>">
                                                        <?= $option['saveur'] . ' • ' . $option['prix'] . '$' ?>
                                                    </option>
                                                <?php endforeach ?>
                                                <!-- Fin du loop pour chaque saveur -->
                                            </select>
                                        <?php endif ?>
                                    </div>
                                    <div class="magasin-info-icones">
                                        <h4 class="magasin-prix"><?php echo $produit["prix"] . "$" ?></h4>
    
                                        <label for="fermer-<?= $produit['nom']?>">
                                            <i class="fas fa-shopping-cart panier-ajouter agrandir-hover icone">+</i>
                                        </label>
                                    </div>
                                    
                                </form>
                                <img class = "magasin-image" src="<?php echo "../images/" . $titreSection . "/" . $produit["nom"] . ".jpg" ?>" alt="Photo de <?= $produit['nom']; ?>">
                            </div>
                            <input type="radio" name = "produit-ouvert" id = "fermer-<?= $produit["nom"] ?>">
                            <label for="fermer-<?= $produit["nom"] ?>">
                                <i class="fas fa-times-circle bouton-quitter agrandir-hover"></i>
                            </label>
                        </div>
                        <!-- Fin de la boite d'information -->
                    </figure>
                    <?php endforeach ?>
                    <!-- Fin du loop pour chaque article -->
                </div>
            </section>
            <div class="ligneDecorative"></div>
            <?php endforeach ?>
            <!-- Fin du loop pour chaque section -->
        </section>
        <!--//////////////////////////////////////////////////////////////////////////////////////////////////// fenetre pop up -->
        <div class="panier-popup"></div>

        <!--//////////////////////////////////////////////////////////////////////////////////////////////////// panier -->
        <section id=panier>
            <h1>Mon panier</h1>
        </section>
        <h2 id=panier-total class="panier-cacher">Prix total</h2>

        <select name="type" id="type-livraison" onchange="typeLivraison()">
            <option value="cueillette">Cueillette</option>
            <option value="livraison">Livraison</option>
        </select>

        <form id=info-courriel>
            <div class=date>
                <label for="date">Date de cueillette désirée</label>
                <input class="input-courriel" type="date" id=date>
            </div>

            <div class=noms>
                <label for="prenom">Prénom</label>
                <input class="input-courriel" type="text" id=prenom>
            </div>

            <div class=noms>    
                <label for="nom">Nom</label>
                <input class="input-courriel" type="text" id=nom>
            </div>

            <div class="infos">
                <label for="courriel">Adresse électronique (courriel)</label>
                <input class="input-courriel" type="email" id=courriel>
            </div>

            <div class="infos">
                <label for="telephone">Téléphone</label>
                <input class="input-courriel" type="tel" id=telephone>
            </div>

            <div>
                <label for="commentaires">Commentaires (spécifications)</label>
                <textarea name="commentaires" id="commentaires" cols="30" rows="5"></textarea>
            </div>
        </form>

        <div class="panier-cacher panier-info-acheter">
            <button id=panier-acheter onclick="acheter()" class="agrandir-hover">
                <h2>Commander</h2>
            </button>

            <div class="rappel-courriel">
                <h4>Ce bouton ouvrira votre boite mail. Veuillez vérifier que vos informations correspondent.</h4>
            </div>
        </div>
        <!--
        <form method="post">
            <input type="text" id="courriel">
            <input type="text" id="mot-de-passe">
            <input type=button id=panier-acheter class="panier-cacher agrandir-hover" onclick="sendEmail()" value="Send Email"></input>
        </form>
        -->
    </main> 

    <footer>
        <p id="telephone">819 571 0002</p>
        <p id="courriel">farcesdescantons@gmail.com</p>
        <p id="addresse">2757 rue Dussault, Sherbrooke, J1L 2Z7</p>
    </footer>
</body>