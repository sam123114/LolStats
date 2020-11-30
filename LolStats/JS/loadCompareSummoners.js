const urlParams = new URLSearchParams(window.location.search);
let summonerNames = urlParams.get('summonerName').split(",");
let champions;
let error;
$(document).ready(async() => {
    champions = await fetchChampionsFromAPI();
    for(let i = 0; i != 5; i++){
        let summoner;
        if(summonerNames[i] != undefined)
            summoner = await fetchSummonerInfoFromAPI(summonerNames[i].replace(" ", ""));
        if(summoner != undefined && summoner.status == undefined){
            displayCard(summoner, i);
        }
    }
    console.log(error);
    if(error){
        rateLimitExceeded();
    }
    $(`.loader-container`).hide();
});

// Utils functions
const lowerCaseAllButFirst = (string) => {
    return string
    .replace(/(\B)[^ ]*/g,match =>(match.toLowerCase()))
    .replace(/^[^ ]/g,match=>(match.toUpperCase()));
}

const getNeededInformationFromMatches = async (matches, accountId) => {
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
    let result = await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`)
        .then(resp => resp.json());
    if(result.status != undefined){
        error = true;
    }
    return result;
}
const fetchRankInfoFromAPI = async (summonerId) => {
    let result = await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`)
        .then(resp => resp.json());
    if(result.status != undefined){
        error = true;
    }
    return result;
}
const fetchMatchesInfoFromAPI = async (accountId, optionalParams) => {
    let url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`;
    if(optionalParams != undefined && optionalParams.length > 0){
        for(param of optionalParams){
            url += `${param}`;
        }
    }
    let result = await fetch(`${urlFetcher}?url=${url}`)
        .then(resp => resp.json());
    if(result.status != undefined){
        error = true;
    }
    return result;
}
const fetchMatchInfoFromAPI = async (matchId, targetedAccountId) => {
    let result = await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}`)
        .then(resp => resp.json());
    if(result.status != undefined){
        error = true;
        return;
    }
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

const displayCard = async (summoner, index) => {
    let bestRank = await fetchRankInfoFromAPI(summoner.id);
    let matches = await fetchMatchesInfoFromAPI(summoner.accountId, [`?endIndex=10`, `&queue=420`, `&queue=440`])
    let info = $('.info-' + index);
    let recent = $('.recent-' + index);
    info.append(
        $(`<div class="tier-icon">`).html(
            $(`<img src="IMG/Emblems/${bestRank[0] != undefined ? bestRank[0].tier : "NO"}.png" alt="summoner rank icon">`)
        ),
        $(`<div class="summoner-name">`).html(
            $(`<a href="#">${summoner.name}</a>`)
        ),
        $(`<div class="tier-info">`).append(
            $(`<span> ${bestRank[0] != undefined ? lowerCaseAllButFirst(bestRank[0].tier) : "Unranked"}</span>`),
            $(`<b>${bestRank[0] != undefined ? bestRank[0].leaguePoints + " LP" : ""}</b>`)
        ),
        $(`
            ${bestRank[0] != undefined ? `
            <div class="winrate">
                <div class="win-rate-progress-bar">
                    <div class="win-rate-progress-fill win-rate-progress-left" style="width: ${bestRank[0].wins / (bestRank[0].wins + bestRank[0].losses) * 100}%"></div>
                    <div class="win-rate-progress-text win-rate-progress-text-left">${bestRank[0].wins}</div>
                    <div class="win-rate-progress-fill win-rate-progress-right"></div>
                    <div class="win-rate-progress-text win-rate-progress-text-right">${bestRank[0].losses}</div>
                </div>
            </div>
            ` : ""}
    `)
    );
    if(matches.status == undefined){
        infos = await getNeededInformationFromMatches(matches, summoner.accountId);
        let recentHTML = await loadRecentGames(infos.matchInfos);
        recent.append(
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
        );
    } else {
        recent.append(
            $(`<div class="recent-title">Aucune Partie Récente</div>`)
        );
    }
}

const loadRecentGames = async (matchInfos) => {
    html = ``
    for(info of matchInfos){
        let first = new Date(info.elapsedTime);
        let second = new Date();
        let days = Math.round((second-first)/(1000*60*60*24));

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
                <span>il y a ${days < 30 ? days+" jours" : (days / 30)+" mois"}</span>
            </div>
        </li>
        `
    }
    return html;
}

const rateLimitExceeded = () => {
    alert("Une erreur est survenue, la limite de requête que nous pouvons envoyer vers les serveur de Riot games a été atteinte. S'il vous plait, réessayer dans quelques minutes.")
}