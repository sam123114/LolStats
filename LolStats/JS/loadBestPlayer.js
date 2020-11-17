const urlParams = new URLSearchParams(window.location.search);
let queue = urlParams.get('queue');
let data;
$(document).ready(async() => {
    if(queue == "Solo"){
        $('#solo-btn').addClass('selected');
        $('#flex-btn').removeClass('selected');
        let res = await fetchSoloRanking()
        displayData(res);
    } else if(queue == "Flex"){
        $('#solo-btn').removeClass('selected');
        $('#flex-btn').addClass('selected');
        let res = await fetchFlexRanking()
        displayData(res);
    } else {
        $('#solo-btn').addClass('selected');
        $('#flex-btn').removeClass('selected');
        let res = await fetchSoloRanking();
        displayData(res);
    }
})

const fetchSoloRanking = async () => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`)
        .then(resp => resp.json());
}

const fetchFlexRanking = async () => {
    return await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_FLEX_SR`)
        .then(resp => resp.json());
}

const displayData = (res) => {
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
    for(let i = 0; i != data.entries.length; i++){
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