const urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('summonerName');
let champions;
let allSpells
let matchsToDisplay = 5;
let matchList;
let allMatchesInfos = [];
let maps;
let lastGameId;
$(document).ready(async() => {
    champions = await fetchChampionsFromAPI();
    allSpells = await fetchSpellsFromAPI();
    maps = await fetchMapsFromAPI();
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
    $('#liveMatchBtn').click(async () => {
        let currentGameInfo = await fetchCurrentGameInfoFromAPI(profile);
        displayLiveGame(currentGameInfo);
        let liveMatchDiv = $('#liveMatch')[0];
        let matchInfoDiv = $('#matchInfo')[0];
        liveMatchDiv.style.display = liveMatchDiv.style.display == 'block' ? 'none' : 'block';
        matchInfoDiv.style.display = matchInfoDiv.style.display == 'flex' ? 'none' : 'flex';
    });
})

//Utils functions
const kFormatter = (num, digits) => {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const parseTime = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

//Fetch Functions
const fetchCurrentGameInfoFromAPI = async (profile) => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${profile.id}`)
        .then(resp => resp.json());
}
const fetchMasteriesPointFromAPI = async (summonerId, championId) => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}`)
        .then(resp => resp.json());
}
const fetchProfileInfoFromAPI = async () => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`)
        .then(resp => resp.json());
}
const fetchRankInfoFromAPI = async (summonerId) => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`)
        .then(resp => resp.json());
}
const fetchMatchListFromAPI = async (profile) => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${profile.accountId}`)
        .then(resp => resp.json());
}
const fetchMatchFromAPI = async (match) => {
    let matchInfo = await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/match/v4/matches/${match.gameId}`)
        .then(resp => resp.json());
    allMatchesInfos.push(matchInfo);
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
    return await fetch('http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/champion.json')
        .then(resp => resp.json());
}
const fetchSpellsFromAPI = async () => {
    return await fetch('http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/summoner.json')
        .then(resp => resp.json())
}
const fetchMapsFromAPI = async () => {
    return await fetch('http://static.developer.riotgames.com/docs/lol/maps.json')
        .then(resp => resp.json());
}
const getChampionNameById = (championId) =>{
    for(let champion in champions.data){
        if(champions.data[champion].key == championId)
            return champions.data[champion].id;
    }
}
const getSpellNameById = (spellId) => {
    for(let spell in allSpells.data)
        if(allSpells.data[spell].key == spellId)  
            return allSpells.data[spell];
}
const getMapNameById = (mapId) => {
    for(let map in maps)
        if(maps[map].mapId == mapId)
            return maps[map].mapName;
}
const getQueueTypeById = (queueId) => {
    if(queueId == 0) {
        return "Custom";
    } else if(queueId == 420) {
        return "Ranked Solo/Duo";
    } else if(queueId == 440) {
        return "Ranked Flex";
    } else if(queueId == 450 || queueId == 100) {
        return "ARAM";
    } else if(queueId == 430 || queueId == 400) {
        return "Normal";
    } else if(queueId == 820 || queueId == 830 || queueId == 840 || queueId == 850) {
        return "Co-op vs AI";
    } else if(queueId == 1090 || queueId == 1100 || queueId == 1110) {
        return "TFT";
    }
    
    return "RGM";
}
const displayProfilInfo = (profile) => {
    $('#profileImg')[0].src = `http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/${profile.profileIconId}.png`;
    $('#name')[0].textContent += profile.name;
    $('#level')[0].textContent += profile.summonerLevel;
}
const loadTeamPlayers = async (participants, teamId) => {
    let players = ``;
    for(let i = 0; i < participants.length; i++){
        let participant = participants[i];
        if(participant.teamId == teamId){
            let summonerEntries = await fetchRankInfoFromAPI(participant.summonerId);
            let championMasteriesPoint = await fetchMasteriesPointFromAPI(participant.summonerId, participant.championId);
            let rankInfo = ``;
            let winRate = ``;
            if(summonerEntries.length != 0){
                rankInfo = `${summonerEntries[0].tier} ${summonerEntries[0].rank} (${summonerEntries[0].leaguePoints} LP)`;
                winRate = `
                <div class="win-rate">
                    <div class="win-rate-progress-bar">
                        <div class="win-rate-progress-fill win-rate-progress-left" style="width: ${summonerEntries[0].wins / (summonerEntries[0].wins + summonerEntries[0].losses) * 100}%"></div>
                        <div class="win-rate-progress-text win-rate-progress-text-left">${summonerEntries[0].wins}</div>
                            <div class="win-rate-progress-fill win-rate-progress-right"></div>
                        <div class="win-rate-progress-text win-rate-progress-text-right">${summonerEntries[0].losses}</div>
                    </div>
                    <span class="winrate-text">${Math.round(summonerEntries[0].wins / (summonerEntries[0].wins + summonerEntries[0].losses) * 100)}%</span>
                </div>
                `
            } else {
                rankInfo = `UNRANKED`;
                winRate = `
                <span style="width: 100%; color: #FFF">-</span>
                `;
            }
            players += `
            <tr class="teamRow">
            <td class="championImg liveMatchBodyCell" colspan="2">
                <img src="http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${getChampionNameById(participant.championId)}.png" class="img">
            </td>
            <td class="summonerSpell">
                <div class="liveSpell">
                    <img src="http://opgg-static.akamaized.net/images/lol/spell/${getSpellNameById(participant.spell1Id).id}.png?image=q_auto,w_10&v=1603864069" alt="summonerSpell">
                </div>
                <div class="liveSpell">
                    <img src="http://opgg-static.akamaized.net/images/lol/spell/${getSpellNameById(participant.spell2Id).id}.png?image=q_auto,w_10&v=1603864069" alt="summonerSpell">
                </div>
            </td>
            <td class="summonerRuneIcon">
                <div class="liveRuneIcon">
                    <img src="http://opgg-static.akamaized.net/images/lol/perk/${participant.perks.perkIds[0]}.png?image=q_auto,w_10&v=1603864069" alt="summonerRune">
                </div>
                <div class="liveRuneIcon">
                    <img src="http://opgg-static.akamaized.net/images/lol/perkStyle/${participant.perks.perkSubStyle}.png?image=q_auto,w_10&v=1603864069" alt="summonerRune">
                </div>
            </td>
            <td class="liveSummoner">
                <a href="summoner.php?summonerName=${participant.summonerName}" class="liveSummonerName">${participant.summonerName}</a>
            </td>
            <td class="liveSummonerTier">
                <span class="liveTier">${rankInfo}</span>
            </td>
            <td class="liveWinRate">
                ${winRate}
            </td>
            <td class="liveMasteriesPoint">
                <span>${kFormatter(championMasteriesPoint.championPoints, 1)}</span>
            </td>
            </tr>
            `
        }
    }
    players += ``
    return players;
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
        displayMatchInfos(matchInfos,i);
    }
}
const displayMatchInfos = (matchInfos,matchIndex) => {
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
    let items = '<div>';
    for(let i = 0; i < matchInfos.items.length; ++i){
        if(matchInfos.items[i] == 0)
            items += `<img src='IMG/NoImage.png'/>`;
        else
            items+= `<img src="//opgg-static.akamaized.net/images/lol/item/${matchInfos.items[i]}.png?image=q_auto,w_22&v=1601445791"/>`;
        if(i == 2)
            items += '</div><div>';
    }
    items += '</div>';

    let players = '<div class="team">';
    for(let i = 0; i < 10; ++i){
        let playerName = matchInfos.allPlayers[i].summonerName;
        if(playerName.length > 8){
            playerName = playerName.substring(0,7);
            playerName += '...';
        }
        if(i == 5)
            players +=`</div><div class="team">`;
        players += `<div class="summoner">
                        <img src="//opgg-static.akamaized.net/images/lol/champion/${matchInfos.allPlayers[i].championName}.png?image=q_auto,w_46&v=1601445791"/>
                        <span class="summonerName">
                            <a href='summoner.php?summonerName=${matchInfos.allPlayers[i].summonerName}'>${playerName}</a>
                        </span>
                </div>`
    }
    players += '</div>';
    $('#matchList').append(`
        <div class='matchContainer'>
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
                <div id='${matchIndex}' class='dropDownArrow' onClick="arrowToggle(this,allMatchesInfos)">
                    <img src='IMG/dropDownArrow.png' class='arrow'/>
                </div>
            </div>
        </div>
    `).show('slow');
}

const displayLiveGame = async (currentGameInfo) => {
    if($('.liveError').length){
        for(let i = 0; i < $('.liveError').length; i++){
            $('.liveError')[i].remove();
        }
    }
    if(currentGameInfo.gameType != "MATCHED_GAME"){
        $('#liveMatch').append(`
            <div class="liveError">
                <span>L'invocateur n'est pas dans une partie. Veuillez réessayer.</span>
            </div>
        `).show();
        return;
    }
    if(lastGameId != undefined){
        if(currentGameInfo.gameId == lastGameId){
            for(let i = 0; i < $('.liveMatch').length; i++){
                $('.liveMatch')[i].remove();
            }
            return;
        }
    }
    lastGameId = currentGameInfo.gameId;
    let mapName = getMapNameById(currentGameInfo.mapId);
    let queueType = getQueueTypeById(currentGameInfo.gameQueueConfigId);

    let team100Players = await loadTeamPlayers(currentGameInfo.participants, 100);
    let team200Players = await loadTeamPlayers(currentGameInfo.participants, 200);

    let startDate = new Date(currentGameInfo.gameStartTime);
    //let date = new Date();
    //let gameDuration = date - startDate;
    //let durationParsed = (Math.abs(gameDuration) / 1000) / 60;
    //console.log(gameDuration.toISOString().substr(11, 8));

    setInterval(()=>{
        let date = new Date();
        let gameDuration = date - startDate;
        $('.gameDuration').text(parseTime(Math.abs(gameDuration) / 1000));
    }, 1000);

    $('#liveMatch').append(`
        <div class="liveMatchTitle">
            <span><b>${queueType}</b> | ${mapName} | <span class="gameDuration">27:42</span></span>
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
                        <th class="liveMatchHeaderCell">Champion masteries point</th>
                    </tr>
                </thead>
                <tbody>
                    ${team100Players}
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
                        <th class="liveMatchHeaderCell">Champion masteries point</th>
                    </tr>
                </thead>
                <tbody>
                    ${team200Players}
                </tbody>
            </table>
        </div>
    `).show('slow');
}

const displayDetailedRunes = (e, perks) => {
    console.log(perks);
}
