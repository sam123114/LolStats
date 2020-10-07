const urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('summonerName');
const apiKey = 'RGAPI-0429ac23-60b3-41d2-a5f5-2f74adb9449e';
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
    $('#togFavorite').click(() =>{
        let action = $('#favoriteAction')[0].value;
        if(action == 'add')
            $('#favoriteAction')[0].value = 'remove';
        else
            $('#favoriteAction')[0].value = 'add';
        $('#togFavorite').load("LOGIC/favorite.logic.php", {
            'playerName': name,
            'action': action
        });
    })
})
const displayData = (profileInfo,rankedInfo) => {
    console.log(profileInfo);
    $('#profileImg')[0].src = `http://ddragon.leagueoflegends.com/cdn/10.20.1/img/profileicon/${profileInfo.profileIconId}.png`;
    $('#name')[0].textContent += profileInfo.name;
    $('#level')[0].textContent += profileInfo.summonerLevel;
    if(rankedInfo.length != 0){
        if(rankedInfo[0].queueType == 'RANKED_SOLO_5x5'){
            $('#soloImg')[0].src = `IMG/Emblems/${rankedInfo[0].tier}.png`;
            $('#rankSolo')[0].textContent = `${rankedInfo[0].tier} ${rankedInfo[0].rank}`
            let totalGames = rankedInfo[0].wins + rankedInfo[0].losses;
            let winRatio = (rankedInfo[0].wins / totalGames) * 100;
            winRatio = Math.round(winRatio);
            $('#ratioSolo')[0].textContent += `Win Ratio ${winRatio}%`;

            $('#flexImg')[0].src = `IMG/Emblems/${rankedInfo[1].tier}.png`;
            $('#rankFlex')[0].textContent = `${rankedInfo[1].tier} ${rankedInfo[1].rank}`
            totalGames = rankedInfo[1].wins + rankedInfo[1].losses;
            winRatio = (rankedInfo[1].wins / totalGames) * 100;
            winRatio = Math.round(winRatio);
            $('#ratioFlex')[0].textContent += `Win Ratio ${winRatio}%`;
        }
        else{
            $('#soloImg')[0].src = `IMG/Emblems/${rankedInfo[1].tier}.png`;
            $('#rankSolo')[0].textContent = `${rankedInfo[1].tier} ${rankedInfo[1].rank}`
            let totalGames = rankedInfo[1].wins + rankedInfo[1].losses;
            let winRatio = (rankedInfo[1].wins / totalGames) * 100;
            winRatio = Math.round(winRatio);
            $('#ratioSolo')[0].textContent += `Win Ratio ${winRatio}%`;

            $('#flexImg')[0].src = `IMG/Emblems/${rankedInfo[0].tier}.png`;
            $('#rankFlex')[0].textContent = `${rankedInfo[0].tier} ${rankedInfo[0].rank}`
            totalGames = rankedInfo[0].wins + rankedInfo[0].losses;
            winRatio = (rankedInfo[0].wins / totalGames) * 100;
            winRatio = Math.round(winRatio);
            $('#ratioFlex')[0].textContent += `Win Ratio ${winRatio}%`;
        }
        
    }
    else{
        $('#soloImg')[0].src = `IMG/Emblems/NO.png`;
        $('#flexImg')[0].src = `IMG/Emblems/NO.png`;
        $('#rankSolo')[0].textContent = 'Non classé';
        $('#rankFlex')[0].textContent = 'Non classé';
    }
    
}