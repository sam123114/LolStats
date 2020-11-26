const urlParams = new URLSearchParams(window.location.search);
let summonerNames = urlParams.get('summonerName').split(",");
let champions;
$(document).ready(async() => {
    champions = await fetchChampionsFromAPI();
    for (name of summonerNames){
        summoner = await fetchSummonerInfoFromAPI(name);
        if(summoner.status == undefined){
            displayCard(summoner);
        }
    }
});

// Utils functions
const lowerCaseAllButFirst = (string) => {
    return string
    .replace(/(\B)[^ ]*/g,match =>(match.toLowerCase()))
    .replace(/^[^ ]/g,match=>(match.toUpperCase()));
}

const getNeededInformationFromMatches = async (matches, accountId) => {
    // NbWin, NbLose, ChampionPlayed, tempsDepuisLaGame
    let wins = 0;
    let losses = 0;
    let matchInfos = [];
    for(let i = 0; i != 10; i++){
        let match = await fetchMatchInfoFromAPI(matches.matches[i].gameId, accountId);
        if(match != undefined){
            if(match.win){
                wins += 1;
            } else {
                losses += 1;
            }
            matchInfos.push(match);
        }
    }
    return {wins, losses, matchInfos};
}

const getChampionNameById = (championId) =>{
    for(let champion in champions.data){
        if(champions.data[champion].key == championId)
            return champions.data[champion].id;
    }
}

// Fetch functions
const fetchSummonerInfoFromAPI = async (name) => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`)
        .then(resp => resp.json());
}
const fetchRankInfoFromAPI = async (summonerId) => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`)
        .then(resp => resp.json());
}
const fetchMatchesInfoFromAPI = async (accountId, optionalParams) => {
    let url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`;
    if(optionalParams != undefined && optionalParams.length > 0){
        for(param of optionalParams){
            url += `${param}`;
        }
    }
    return await fetch(`${urlFetcher}?url=${url}`)
        .then(resp => resp.json());
    
}
const fetchMatchInfoFromAPI = async (matchId, targetedAccountId) => {
    let result = await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}`)
        .then(resp => resp.json());
    let targetedParticipantId;
    let targetedTeamId;
    for(participant of result.participantIdentities){
        if(participant.player.accountId == targetedAccountId){
            targetedParticipantId = participant.participantId;
            break;
        }
    }
    let win;
    let championId;
    let elapsedTime = result.gameCreation;
    let kills;
    let deaths;
    let assists;

    for(participant of result.participants){
        if(participant.participantId == targetedParticipantId){
            targetedTeamId = participant.teamId;
            championId = participant.championId;
            kills = participant.stats.kills;
            deaths = participant.stats.deaths;
            assists = participant.stats.assists;
            break;
        }
    }

    for(team of result.teams){
        if(team.teamId == targetedTeamId){
            win = team.win == "Win" ? true : false;
            break;
        }
    }

    return {win, championId, elapsedTime, kills, deaths, assists}
}
const fetchChampionsFromAPI = async () => {
    return await fetch('http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/champion.json')
        .then(resp => resp.json());
}

// Display functions
const displayCard = async (summoner) => {
    let bestRank = await fetchRankInfoFromAPI(summoner.id);
    let matches = await fetchMatchesInfoFromAPI(summoner.accountId, [`?endIndex=10`, `&queue=420`, `&queue=440`])
    let list = $('.compare-list')[0];

    infos = await getNeededInformationFromMatches(matches, summoner.accountId);

    let recentHTML = await loadRecentGames(infos.matchInfos);
    $(`<li class="compare-item">`).append(
        $(`<div class="card-container">`).append(
            $(`<div class="card-info">`).append(
                $(`<div class="tier-icon">`).html(
                    $(`<img src="IMG/Emblems/${bestRank[0].tier}.png" alt="summoner rank icon">`)
                ),
                $(`<div class="summoner-name">`).html(
                    $(`<a href="#">${summoner.name}</a>`)
                ),
                $(`<div class="tier-info">`).append(
                    $(`<span> ${lowerCaseAllButFirst(bestRank[0].tier)}</span>`),
                    $(`<b>${bestRank[0].leaguePoints} LP</b>`)
                ),
                $(`
                    <div class="winrate">
                        <div class="win-rate-progress-bar">
                            <div class="win-rate-progress-fill win-rate-progress-left" style="width: ${bestRank[0].wins / (bestRank[0].wins + bestRank[0].losses) * 100}%"></div>
                            <div class="win-rate-progress-text win-rate-progress-text-left">${bestRank[0].wins}</div>
                            <div class="win-rate-progress-fill win-rate-progress-right"></div>
                            <div class="win-rate-progress-text win-rate-progress-text-right">${bestRank[0].losses}</div>
                        </div>
                    </div>
                `)
            ),
            $(`<hr style="width: calc(100px + 40vw) fit-content; background-color: #121212;">`),
            $(`<div class="card-recent-matches">`).append(
                $(`<div class="recent-title">Partie Récente</div>`),
                $(`
                    <div class="winrate">
                        <div class="win-rate-progress-bar">
                            <div class="win-rate-progress-fill win-rate-progress-left" style="width: ${infos.wins / (infos.wins + infos.losses) * 100}%"></div>
                            <div class="win-rate-progress-text win-rate-progress-text-left">${infos.wins}</div>
                            <div class="win-rate-progress-fill win-rate-progress-right"></div>
                            <div class="win-rate-progress-text win-rate-progress-text-right">${infos.losses}</div>
                        </div>
                    </div>
                `),
                $(`<div class="recent-games-container">`).append(
                    $(`<ul class="recent-games">`).html(
                        `${recentHTML}`
                    )
                )
            )
        )
    ).appendTo(list);
}

const loadRecentGames = async (matchInfos) => {
    let gameDate = new Date(matchInfos.elapsedTime);
    let today = new Date();
    let dif = today - gameDate;
    let difDays = difTime / (1000 * 3600 * 24);

    html = ``
    for(info of matchInfos){
        html += `
        <li class="recent-games-item">
            <div class="recent-champion-icon">
                <img src="http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${getChampionNameById(info.championId)}.png" alt="champion icon">
            </div>
            <div class="kda win-${info.win}">
                <span>${info.kills}</span>
                /
                <span>${info.deaths}</span>
                /
                <span>${info.assists}</span>
            </div>
            <div class="time-played">
                <span>il y a ${difDays} jours</span>
            </div>
        </li>
        `
    }
    return html;
}