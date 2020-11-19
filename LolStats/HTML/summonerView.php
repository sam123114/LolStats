<?php 
    include_once "CLASSES/FAVORITES/favorites.php";

    function showFavoriteButton(){
        if(isset($_SESSION['userId'])){
            $favorites = new Favorites();
            if($favorites->alreadyFavorite($_SESSION['userId'], $_GET['summonerName']) == null){
                $favoriteText = 'Ajouter à mes favoris';
                $action = 'add';
            }
            else{
                $favoriteText = 'Retirer de mes favoris';
                $action = 'remove';
            }
            echo "
            <a id='togFavorite' >".$favoriteText."</a>
            <input type='hidden' id='favoriteAction' value='".$action."'/>
            ";
        }
    }

?>
<div id="summonerInfo">
    <div id="profileInfo">
        <div id="profileIcon">
            <img id="profileImg" src="#" height="100"/>
            <h2 id="level" title="Niveau"></h2> 
        </div>
        <h1 id="name"></h1>
        <?php showFavoriteButton() ?>
    </div>
    <a id="liveMatchBtn">Partie en cours</a>
    <hr style="width: calc(100px + 40vw); background-color: #FFF;">
    <div id="liveMatch" style="display: none">
    </div>
    <div id="matchInfo" style="display: flex">
        <div id="rankInfo">
            <div class="rankDiv">
                <img id="soloImg"height="100"/>
                <div class="rankedText">
                    <p>Classé solo</p>
                    <p id="rankSolo" class="rank"></p>
                    <p id="ratioSolo"></p>
                </div>
            </div>
            <div class="rankDiv">
                <img id="flexImg"height="100"/>
                <div class="rankedText">
                    <p>Flex 5:5 Rank</p>
                    <p id="rankFlex" class="rank"></p>
                    <p id="ratioFlex"></p>
                </div>
            </div>
        </div>
        <div id="matchList">
        </div>
        <button id="moreMatchs">Afficher plus de matchs</button>
    </div>  
</div>
