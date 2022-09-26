<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Farces Des Cantons</title>
    <link rel="icon" href="images/favico.ico">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/fontawesome-free-5.15.1-web/css/all.css">

    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href= "css/<?php echo $page?>.css">
    <link rel="stylesheet" href="css/<?php if ($page != 'accueil') {echo 'pages';} ?>.css">

    <?php if ($page == "produits") : ?>
        <link rel="stylesheet" href="css/panier.css">
        <link rel="stylesheet" href="css/boite-info.css">
        <script src="javascript/panier.js" async></script>
        <script src="javascript/raccourcir-titre.js"></script>
    <?php endif; ?>

    <?php if ($page == "accueil") : ?>
        <script src="javascript/popup-desactivation.js"></script>
    <?php endif; ?>

</head>

<header>
    <a href="index.php" class="agrandir-hover">
        <img src="images/logo-fonce.png" alt="Logo" class="logo">
    </a>
    
    <div id="menu">
        <input type="checkbox" id=ouvrir-menu>
        <label for="ouvrir-menu" class="ouvrir-menu icone agrandir-hover">
            <i class="fas fa-bars"></i>
        </label>

        <nav id=principal>
            <div id="accueil">
                <a href="index.php">
                    <h2 class="agrandir-hover <?php if ($page == 'accueil') { echo "actif";} ?>">Accueil</h2>
                </a>
            </div>

            <div id="produits">
                <a href="produits.php">
                    <h2 class="agrandir-hover <?php if ($page == 'produits') { echo "actif";} ?>">Produits</h2>
                </a>
                <?php if ($page == "produits") : ?>
                    <nav id="produits-menu">
                        <ul>
                            <li>
                                <a href="#soupes">
                                    <h4>Soupes</h4>
                                </a>
                            </li>
        
                            <li>
                                <a href="#specialites">
                                    <h4>Spécialités</h4>
                                </a>
                            </li>

                            <li>
                                <a href="#sauces">
                                    <h4>Sauces</h4>
                                </a>
                            </li>

                            <li>
                                <a href="#desserts">
                                    <h4>Desserts</h4>
                                </a>
                            </li>

                            <li>
                                <a href="#nouveautes">
                                    <h4>Nouveautés saisonnières</h4>
                                </a>
                            </li>
                        </ul>
                    </nav>
                <?php endif; ?>
            </div>

            <div id="livraison">
                <a href="livraison.php">
                    <h2 class="agrandir-hover <?php if ($page == 'livraison') { echo "actif";} ?>">Livraison</h2>
                </a>
            </div>
            
            <div id="apropos">
                <a href="apropos.php">
                    <h2 class="agrandir-hover <?php if ($page == 'apropos') { echo "actif";} ?>">À propos</h2>
                </a>
            </div>
        </nav>
    </div>

    <a href="produits.php#panier" class="icone-conteneur">
        <i class="fas fa-shopping-cart icone agrandir-hover"></i>
    </a>
</header>