<?php 
    $page = "livraison"; 
    include('header.php');
?>
    <main>
        <div id="titre">
            <h1>Comment ça fonctionne</h1>
        </div>
        

        <div id="infos">
            <section class="carte-conteneur">
                <i class="fas fa-truck icone icone-livraison"></i>
                <div class="carte">
                    <h2>Livraison gratuite</h2> 
                    <p>Dans un rayon de 10km où moins, pour une commande de 25$ ou plus, nous livrons gratuitement. Nous habitons au 2757 rue Dussault à Sherbrooke!</p>
                    <p>Pour les livraisons plus loin, nous chargeons 5$ additionnels.</p>
                </div>
            </section>
    
            <section class="carte-conteneur">
                <i class="fas fa-shopping-basket icone icone-livraison"></i>
                <div class="carte">
                    <h2>Cueillette aussi possible!</h2>
                    <p>Il suffit de prendre un rendez-vous avec nous par courriel ou par téléphone.</p>
                </div>
            </section>
    
            <section class="carte-conteneur">
                <i class="fas fa-money-check-alt icone icone-livraison"></i> 
                <div class="carte">
                    <h2>Vous payez le prix affiché</h2>
                    <p>Il est possible de payer par virement bancaire ou argent comptant.</p>
                </div>
            </section>

            <section id="map">
                <iframe id = map src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.0854722776307!2d-71.94216568389334!3d45.407615979100285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb7b490081d5981%3A0x25f7f3a353c0bd7a!2s2757%20Rue%20Dussault%2C%20Sherbrooke%2C%20QC%20J1L%202Z7!5e0!3m2!1sfr!2sca!4v1628873113369!5m2!1sfr!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </section>
        </div>
    </main>

    <footer>
        <p id="telephone">819 571 0002</p>
        <p id="courriel">farcesdescantons@gmail.com</p>
        <p id="addresse">2757 rue Dussault, Sherbrooke, J1L 2Z7</p>
    </footer>
</body>
</html>