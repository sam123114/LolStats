const urlParams = new URLSearchParams(window.location.search);
let queue = urlParams.get('queue');
let data;
$(document).ready(async() => {
    if(queue == "Solo"){
        $('#solo-btn').addClass('selected');
        $('#flex-btn').removeClass('selected');
        let res = await fetchSoloRanking()
        await displayData(res);
    } else if(queue == "Flex"){
        $('#solo-btn').removeClass('selected');
        $('#flex-btn').addClass('selected');
        let res = await fetchFlexRanking()
        await displayData(res);
    } else {
        $('#solo-btn').addClass('selected');
        $('#flex-btn').removeClass('selected');
        let res = await fetchSoloRanking();
        await displayData(res);
    }
})

const lowerCaseAllButFirst = (string) => {
    return string
    .replace(/(\B)[^ ]*/g,match =>(match.toLowerCase()))
    .replace(/^[^ ]/g,match=>(match.toUpperCase()));
}

const fetchSoloRanking = async () => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`)
        .then(resp => resp.json());
}

const fetchFlexRanking = async () => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_FLEX_SR`)
        .then(resp => resp.json());
}

const fetchProfileInfoFromAPI = async (summonerName) => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`)
        .then(resp => resp.json());
}

const displayData = async (res) => {
    let tableBody = $('#table-body')[0];
    res.entries.sort((a,b) => {
        if(a.leaguePoints < b.leaguePoints)
            return 1;
        else if(a.leaguePoints > b.leaguePoints)
            return -1;
        else 
            return 0;
    });
    data = res;
    await displayRankingPodium();
    for(let i = 3; i != data.entries.length; i++){
        let entry = data.entries[i];
        let $tr = $(`<tr class="ranking-table-row">`).append(
            $(`<td class="ranking-table-cell ranking-table-cell-rank">`).text(i + 1),
            $(`<td class="ranking-table-cell ranking-table-cell-summoner">`).html(
                    $(`<a href="summoner.php?summonerName=${entry.summonerName}">`).html(
                        $(`<span>${entry.summonerName}</span>`)
                    ) 
                ),
            $(`<td class="ranking-table-cell ranking-table-cell-tier">`).html(
                $(`<img src="IMG/Emblems/${data.tier}.png" alt="summoner rank icon">`),
                $(`<span>${data.tier}</span>`)
            ),
            $(`<td class="ranking-table-cell ranking-table-cell-lp">`).text(`${entry.leaguePoints} LP`),
            $(`<td class="ranking-table-cell ranking-table-cell-winrate">`).html(
                $(`
                    <div class="win-rate">
                        <div class="win-rate-progress-bar">
                            <div class="win-rate-progress-fill win-rate-progress-left" style="width: ${entry.wins / (entry.wins + entry.losses) * 100}%"></div>
                            <div class="win-rate-progress-text win-rate-progress-text-left">${entry.wins}</div>
                            <div class="win-rate-progress-fill win-rate-progress-right"></div>
                            <div class="win-rate-progress-text win-rate-progress-text-right">${entry.losses}</div>
                        </div>
                        <span class="winrate-text">${Math.round(entry.wins / (entry.wins + entry.losses) * 100)}%</span>
                    </div>
                `)
            )
        ).appendTo(tableBody);
    }
}

const displayRankingPodium = async () => {
    let list = $('.ranking-podium-list')[0];
    let first = true;

    for(let i = 0; i != 3; i++){
        //let profile = await fetchProfileInfoFromAPI(data.entries[i].summonerName);
        $(`<li class="ranking-podium-item ranking-podium-item-${first ? `top` : `bot`}">`).append(
            $('<div class="ranking-podium-item-rank">').text(i + 1),
            /*$(' <div class="ranking-podium-item-icon">').html(
                $('<a href="#">').html(
                    $(`<img src="//opgg-static.akamaized.net/images/profile_icons/profileIcon${profile.profileIconId}.jpg?image=c_scale,q_auto&v=1518361200" alt="icon" class="ranking-podium-item-icon-image">`)
                )
            ),*/
            $(`<a href="summoner.php?summonerName=${data.entries[i].summonerName}" class="ranking-podium-item-summonerName">`).text(data.entries[i].summonerName),
            /*$(`<div class="ranking-podium-item-level">`).text(`Lv.${profile.summonerLevel}`),*/
            $(`<div class="ranking-podium-item-tier">`).append(
                $(`<img src="IMG/Emblems/${data.tier}.png" alt="summoner rank icon">`),
                $(`<span>`).text(` ${lowerCaseAllButFirst(data.tier)}`),
                $(`<b>`).text(`${data.entries[i].leaguePoints} LP`)
            ),
            $(`
                    <div class="ranking-podium-item-winrate">
                        <div class="win-rate-progress-bar">
                            <div class="win-rate-progress-fill win-rate-progress-left" style="width: ${data.entries[i].wins / (data.entries[i].wins + data.entries[i].losses) * 100}%"></div>
                            <div class="win-rate-progress-text win-rate-progress-text-left">${data.entries[i].wins}</div>
                            <div class="win-rate-progress-fill win-rate-progress-right"></div>
                            <div class="win-rate-progress-text win-rate-progress-text-right">${data.entries[i].losses}</div>
                        </div>
                        <span class="winrate-text">${Math.round(data.entries[i].wins / (data.entries[i].wins + data.entries[i].losses) * 100)}%</span>
                    </div>
                `)
        ).appendTo(list);
        first = false;
    }
}