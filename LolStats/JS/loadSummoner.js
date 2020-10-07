const urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('summonerName');
const apiKey = 'RGAPI-4e2ddf57-8d0e-41db-b8c0-94e1811cf4f1';
$(document).ready(() => {
    fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${apiKey}`).then((resp1) => {
        resp1.json().then((res) => {
            fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${res.id}?api_key=${apiKey}`).then((resp2) => {
                resp2.json().then((res2) => {
                    displayData(res,res2);
                })
            })  
        })
    })
    $('#togFavorite').click(function(){
        //POUR L'INSTANT J'AI HARDCODÉ POUR TESTER MAIS IL FAIT REMPLACER LE CHIFFRE PAR LE SUMMONERID
        $('#togFavorite').load("LOGIC/favorite.logic.php", {'PlayerId': '123'}, function(response, status, xhr){
            alert(status);
        });
    })
})


const displayData = (profileInfo,rankedInfo) => {
    console.log(rankedInfo);
    $('#profileImg')[0].src = `http://ddragon.leagueoflegends.com/cdn/10.20.1/img/profileicon/${profileInfo.profileIconId}.png`;
    $('#name')[0].textContent += profileInfo.name;
    $('#level')[0].textContent += profileInfo.summonerLevel;
    $('#soloRank')[0].src = `IMG/Emblems/${rankedInfo[0].tier}.png`;
    $('#rank')[0].textContent = `${rankedInfo[0].tier} ${rankedInfo[0].rank}`
    let totalGames = rankedInfo[0].wins + rankedInfo[0].losses;
    let winRatio = (rankedInfo[0].wins / totalGames) * 100;
    winRatio = Math.round(winRatio);
    $('#ratio')[0].textContent += ` ${winRatio}%`;
}