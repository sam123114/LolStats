<?php 
    include_once "CLASSES/FAVORITES/favorites.php";

    $favorites = new Favorites();
    if($favorites->alreadyFavorite($_SESSION['userId'], $_GET['summonerName']) == null){
        $favoriteText = 'Ajouter à mes favoris';
        $action = 'add';
    }
    else{
        $favoriteText = 'Retirer de mes favoris';
        $action = 'remove';
    }
?>
<div id="summonerInfo">
    <div id="profileInfo">
        <div id="profileIcon">
            <img id="profileImg" src="#" height="100"/>
            <h2 id="level" title="Niveau"/></h2> 
        </div>
        <h1 id="name"></h1>
        <a id="togFavorite" ><?php echo $favoriteText ?></a>
        <input type="hidden" id="favoriteAction" value="<?php echo $action ?>"/> 
    </div>
    <hr style="width: 100%; background-color: #FFF;">
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
    
</div>
