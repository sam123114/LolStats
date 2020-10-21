<?php 
    include_once "CLASSES/FAVORITES/favorites.php";

    if(!isset($_SESSION['userId'])){
        header("Location: index.php");
        die();
    }

    function loadFavorites(){
        $favorites = new Favorites();
        $favList = $favorites->getFavorites($_SESSION['userId']);
        foreach($favList as $fav){
            $summonerName = $fav["PlayerName"];
            echo "<a href='summoner.php?summonerName=" . $summonerName . "'><span>" . $summonerName . "</span></a>";
        }
    }
?>

<div id="page-content">
    <h3 id="title">Vos favoris</h3>
    <div class="favorite-container">
        <?php loadFavorites() ?>
    </div>
</div>