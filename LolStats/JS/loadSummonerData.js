const urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('summonerName');
const apiKey = 'RGAPI-7495bce1-43e9-48d6-9a14-75361c82199b';
let champions;
let allSpells
let matchsToDisplay = 5;
let matchList;
$(document).ready(async() => {
    champions  =await fetchChampionsFromAPI();
    allSpells = await fetchSpellsFromAPI();
    let profile = await fetchProfileInfoFromAPI();
    if(profile.status != undefined && profile.status.status_code == 404){
        window.location.href="summoner-not-found.php";
    }
    name = profile.name;
    let rankInfo =  await fetchRankInfoFromAPI(profile.id);
    displayProfilInfo(profile);
    displayRankInfo(rankInfo);
    matchList = await fetchMatchListFromAPI(profile);
    displayMatches(0);
    $('#moreMatchs').click(async () => {
        let temp = matchsToDisplay;
        matchsToDisplay+= 5;
        displayMatches(temp);
    });
})

//Fetch Functions
const fetchProfileInfoFromAPI = async () => {
    return await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${apiKey}`)
        .then(resp => resp.json());
}
const fetchRankInfoFromAPI = async (summonerId) => {
    return await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`)
        .then(resp => resp.json());
}
const fetchMatchListFromAPI = async (profile) => {
    return await fetch(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${profile.accountId}?api_key=${apiKey}`)
        .then(resp => resp.json());
}
const fetchMatchFromAPI = async (match) => {
    let matchInfo = await fetch(`https://na1.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=${apiKey}`)
        .then(resp => resp.json());
    let gameDuration = Math.round(matchInfo.gameDuration/60);
    let players = matchInfo.participantIdentities;
    let currentPlayerParticipantId;
    let allPlayers = [];
    for(let player of players){
        allPlayers.push({summonerName: player.player.summonerName});
        if(player.player.summonerName == name)
            currentPlayerParticipantId = player.participantId;
    }
    for(let i = 0; i < allPlayers.length; ++i)
        allPlayers[i] = {...allPlayers[i],championName : getChampionNameById(matchInfo.participants[i].championId)};
    let currentPlayerStats = matchInfo.participants[currentPlayerParticipantId-1];
    let KDA = {
        kills: currentPlayerStats.stats.kills,
        deaths: currentPlayerStats.stats.deaths,
        assists: currentPlayerStats.stats.assists
    }
    let items = [
        currentPlayerStats.stats.item0,
        currentPlayerStats.stats.item1,
        currentPlayerStats.stats.item2,
        currentPlayerStats.stats.item3,
        currentPlayerStats.stats.item4,
        currentPlayerStats.stats.item5,
        currentPlayerStats.stats.item6
    ];
    let championLevel = currentPlayerStats.stats.champLevel;
    
    let spells = [];
    for(let spell in allSpells.data)
        if(allSpells.data[spell].key == currentPlayerStats.spell1Id || allSpells.data[spell].key == currentPlayerStats.spell2Id)
            spells.push(allSpells.data[spell]);

    let currentPlayerChampionId = currentPlayerStats.championId;
    let currentPlayerChampionName = getChampionNameById(currentPlayerChampionId);
    let victory = currentPlayerStats.stats.win;
    let matchInfos = {
        gameDuration,
        currentPlayerChampionName,
        championLevel,
        allPlayers,
        KDA,
        victory,
        spells,
        items
    };
    return matchInfos;
}
const fetchChampionsFromAPI = async () => {
    return await fetch('http://ddragon.leagueoflegends.com/cdn/10.21.1/data/en_US/champion.json')
        .then(resp => resp.json());
}
const fetchSpellsFromAPI = async () => {
    return await fetch('http://ddragon.leagueoflegends.com/cdn/10.21.1/data/en_US/summoner.json')
        .then(resp => resp.json())
}
const getChampionNameById = (championId) =>{
    for(let champion in champions.data){
        if(champions.data[champion].key == championId)
            return champions.data[champion].id;
    }
}
const displayProfilInfo = (profile) => {
    $('#profileImg')[0].src = `http://ddragon.leagueoflegends.com/cdn/10.20.1/img/profileicon/${profile.profileIconId}.png`;
    $('#name')[0].textContent += profile.name;
    $('#level')[0].textContent += profile.summonerLevel;
}
//Display Functions
const displayRankInfo = (rankedInfo) => {
    if(rankedInfo.length != 0){
        if(rankedInfo.length != 1){
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
        else if(rankedInfo[0].queueType == 'RANKED_SOLO_5x5'){
            $('#soloImg')[0].src = `IMG/Emblems/${rankedInfo[0].tier}.png`;
            $('#rankSolo')[0].textContent = `${rankedInfo[0].tier} ${rankedInfo[0].rank}`
            let totalGames = rankedInfo[0].wins + rankedInfo[0].losses;
            let winRatio = (rankedInfo[0].wins / totalGames) * 100;
            winRatio = Math.round(winRatio);
            $('#ratioSolo')[0].textContent += `Win Ratio ${winRatio}%`;
            
            $('#flexImg')[0].src = `IMG/Emblems/NO.png`;
            $('#rankFlex')[0].textContent = 'Non classé';
        }
        else{
            $('#flexImg')[0].src = `IMG/Emblems/${rankedInfo[0].tier}.png`;
            $('#rankFlex')[0].textContent = `${rankedInfo[0].tier} ${rankedInfo[0].rank}`
            totalGames = rankedInfo[0].wins + rankedInfo[0].losses;
            winRatio = (rankedInfo[0].wins / totalGames) * 100;
            winRatio = Math.round(winRatio);
            $('#ratioFlex')[0].textContent += `Win Ratio ${winRatio}%`;

            $('#soloImg')[0].src = `IMG/Emblems/NO.png`;
            $('#rankSolo')[0].textContent = 'Non classé';
        }
    }
    else{
        $('#soloImg')[0].src = `IMG/Emblems/NO.png`;
        $('#flexImg')[0].src = `IMG/Emblems/NO.png`;
        $('#rankSolo')[0].textContent = 'Non classé';
        $('#rankFlex')[0].textContent = 'Non classé';
    }
}
const displayMatches = async (reachedMatch) => {
    for(let i = reachedMatch; i < matchsToDisplay; ++i){
        let match = matchList.matches[i];
        let matchInfos = await fetchMatchFromAPI(match);
        displayMatchInfos(matchInfos);
    }
}
const displayMatchInfos = (matchInfos) => {
    let victoryStatus;
    let matchClass;
    if(matchInfos.victory){
        victoryStatus = 'Victoire';
        matchClass = 'win';
    }
    else{
        victoryStatus = 'Défaite';
        matchClass = 'lose';
    }
    let KDARatio = Math.round((matchInfos.KDA.kills + matchInfos.KDA.assists)/matchInfos.KDA.deaths *100)/100;
    let items = '';
    for(let i = 0; i < matchInfos.items.length; ++i){
        if(matchInfos.items[i] == 0)
            items += `<img src='IMG/noImage.jpg'/>`;
        else
            items+= `<img src="//opgg-static.akamaized.net/images/lol/item/${matchInfos.items[i]}.png?image=q_auto,w_22&v=1601445791"/>`;
        if(i == 3)
            items += '<br>';
    }
    let players = '<div class="team">';
    for(let i = 0; i < 10; ++i){
        if(i == 5)
            players+=`</div><div class="team">`;
        players+= `<div class="summoner">
                        <img src="//opgg-static.akamaized.net/images/lol/champion/${matchInfos.allPlayers[i].championName}.png?image=q_auto,w_46&v=1601445791"/>
                        <p class="summonerName">${matchInfos.allPlayers[i].summonerName}</p>
                </div>`
    }
    $('#matchList').append(`
        <div class="matchSummary ${matchClass}">
            <div class="gameStats">
                <p class="gameResult">${victoryStatus}</p>
                <p class="gameLength">Durée: ${matchInfos.gameDuration} minutes</p>
            </div>
        <div class="gameSettingInfo">
            <img src="//opgg-static.akamaized.net/images/lol/champion/${matchInfos.currentPlayerChampionName}.png?image=q_auto,w_46&v=1601445791" class="championImage"/>
            <div class="summonerSpell">
                <img src="//opgg-static.akamaized.net/images/lol/spell/${matchInfos.spells[0].id}.png?image=q_auto,w_22&v=1601445791" class="spell"/>
                <img src="//opgg-static.akamaized.net/images/lol/spell/${matchInfos.spells[1].id}.png?image=q_auto,w_22&v=1601445791" class="spell"/>
            </div>
            <p class="championName">${matchInfos.currentPlayerChampionName}</p>
        </div>
        <div class="KDAStats">
            <div class="KDA">
                <p class="kill">${matchInfos.KDA.kills}</p>/
                <p class="death">${matchInfos.KDA.deaths}</p>/
                <p class="assist">${matchInfos.KDA.assists}</p>
            </div>
            <p class="KDARatio">${KDARatio}:1 KDA</p>
        </div>
        <div class="stats">
            <p class="level">Niveau ${matchInfos.championLevel}</p>
        </div>
        <div class="items">
            <p>Items</p>
            <div class="itemList">
                ${items}
            </div>
        </div>
        <div class="players">
            ${players}
        </div>
    </div>
    `);
}
