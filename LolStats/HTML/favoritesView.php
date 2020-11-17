<?php 
    include_once "CLASSES/FAVORITES/favorites.php";

    if(!isset($_SESSION['userId'])){
        header("Location: index.php");
        die();
    }

    function loadFavorites(){
        $favorites = new Favorites();
        $favList = $favorites->getFavorites($_SESSION['userId']);
        for($i = 0; $i < count($favList); ++$i){
            $summonerName = $favList[$i]["PlayerName"];
            $number = $i+1;
            echo "<tr id='$summonerName'>";
            echo "<td>$number</td>";
            echo "<td><a href='summoner.php?summonerName=" . $summonerName . "'><span>" . $summonerName . "</span></a></td>";
            echo "<td class='btnFav'><a class='togFavorite'>Retirer de mes favoris</a></td>";
            echo "<td class='x'><span class='togFavorite'>&times;</span></td>";
            echo "</tr>";
        }
    }
?>
<div id="page-content">
    <h2 id="title">Mes favoris</h2>
    <table class="table table-dark table-striped">
        <tr>
            <th>#</th>
            <th>Nom du joueur</th>
            <th id="action"></th>
        </tr>
            <?php loadFavorites() ?>
    </table>
</div>
