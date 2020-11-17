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
<div id="wrapper"></div>
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
    <!--<div class="liveMatchTitle">
            <span><b>Match classé Solo</b> | Summoner's rift | 27:42</span>
        </div>
        <div class="liveMatchContent">
            <table class="liveMatchTable team-100">
                <colgroup>
                    <col width="7">
                    <col width="60">
                    <col width="14">
                    <col width="12">
                    <col width="149">
                    <col width="170">
                    <col width="220">
                    <col width="150">
                </colgroup>
                <thead class="teamHeader">
                    <tr class="teamHeaderRow">
                        <th class="liveMatchHeaderCell bar"></th>
                        <th class="liveMatchHeaderCell teamName" colspan="4">Équipe Bleue</th>
                        <th class="liveMatchHeaderCell">Rank de saison</th>
                        <th class="liveMatchHeaderCell">Ratio de victoire</th>
                        <th class="liveMatchHeaderCell"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="teamRow">
                        <td class="championImg liveMatchBodyCell" colspan="2">
                            <img src="http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/Jax.png" alt="jax icon" class="img">
                        </td>
                        <td class="summonerSpell">
                            <div class="liveSpell">
                                <img src="http://opgg-static.akamaized.net/images/lol/spell/SummonerFlash.png?image=q_auto,w_10&v=1603864069" alt="summonerSpell">
                            </div>
                            <div class="liveSpell">
                                <img src="http://opgg-static.akamaized.net/images/lol/spell/SummonerTeleport.png?image=q_auto,w_10&v=1603864069" alt="summonerSpell">
                            </div>
                        </td>
                        <td class="summonerRuneIcon">
                            <div class="liveRuneIcon">
                                <img src="http://opgg-static.akamaized.net/images/lol/perk/8010.png?image=q_auto,w_10&v=1603864069" alt="summonerRune">
                            </div>
                            <div class="liveRuneIcon">
                                <img src="http://opgg-static.akamaized.net/images/lol/perkStyle/8400.png?image=q_auto,w_10&v=1603864069" alt="summonerRune">
                            </div>
                        </td>
                        <td class="liveSummoner">
                            <a href="#" class="liveSummonerName">bobsnipe</a>
                        </td>
                        <td class="liveSummonerTier">
                            <span class="liveTier">Platinum 4 (14 LP)</span>
                        </td>
                        <td class="liveWinRate">
                            <div class="win-rate">
                                <div class="win-rate-progress-bar">
                                    <div class="win-rate-progress-fill win-rate-progress-left" style="width: 43%"></div>
                                    <div class="win-rate-progress-text win-rate-progress-text-left">35</div>
                                    <div class="win-rate-progress-fill win-rate-progress-right"></div>
                                    <div class="win-rate-progress-text win-rate-progress-text-right">47</div>
                                </div>
                                <span class="winrate-text">43%</span>
                            </div>
                        </td>
                        <td class="liveRune">
                            <button class="liveRuneButton">Runes</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="liveMatchTable team-200">
            <colgroup>
                    <col width="7">
                    <col width="60">
                    <col width="14">
                    <col width="12">
                    <col width="149">
                    <col width="170">
                    <col width="220">
                    <col width="150">
                </colgroup>
                <thead class="teamHeader">
                    <tr class="teamHeaderRow">
                        <th class="liveMatchHeaderCell bar"></th>
                        <th class="liveMatchHeaderCell teamName" colspan="4">Équipe Rouge</th>
                        <th class="liveMatchHeaderCell">Rank de saison</th>
                        <th class="liveMatchHeaderCell">Ratio de victoire</th>
                        <th class="liveMatchHeaderCell"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="teamRow">
                        <td class="championImg liveMatchBodyCell" colspan="2">
                            <img src="http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/Jax.png" alt="jax icon" class="img">
                        </td>
                        <td class="summonerSpell">
                            <div class="liveSpell">
                                <img src="http://opgg-static.akamaized.net/images/lol/spell/SummonerFlash.png?image=q_auto,w_10&v=1603864069" alt="summonerSpell">
                            </div>
                            <div class="liveSpell">
                                <img src="http://opgg-static.akamaized.net/images/lol/spell/SummonerTeleport.png?image=q_auto,w_10&v=1603864069" alt="summonerSpell">
                            </div>
                        </td>
                        <td class="summonerRuneIcon">
                            <div class="liveRuneIcon">
                                <img src="http://opgg-static.akamaized.net/images/lol/perk/8010.png?image=q_auto,w_10&v=1603864069" alt="summonerRune">
                            </div>
                            <div class="liveRuneIcon">
                                <img src="http://opgg-static.akamaized.net/images/lol/perkStyle/8400.png?image=q_auto,w_10&v=1603864069" alt="summonerRune">
                            </div>
                        </td>
                        <td class="liveSummoner">
                            <a href="#" class="liveSummonerName">bobsnipe</a>
                        </td>
                        <td class="liveSummonerTier">
                            <span class="liveTier">Platinum 4 (14 LP)</span>
                        </td>
                        <td class="liveWinRate">
                            <div class="win-rate">
                                <div class="win-rate-progress-bar">
                                    <div class="win-rate-progress-fill win-rate-progress-left" style="width: 43%"></div>
                                    <div class="win-rate-progress-text win-rate-progress-text-left">35</div>
                                    <div class="win-rate-progress-fill win-rate-progress-right"></div>
                                    <div class="win-rate-progress-text win-rate-progress-text-right">47</div>
                                </div>
                                <span class="winrate-text">43%</span>
                            </div>
                        </td>
                        <td class="liveRune">
                            <button class="liveRuneButton">Runes</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>-->
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
