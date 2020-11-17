// Le code commenté peut servir à rendre l'affichage de la table sur plusieurs page, mais n'est pas
// utilisé à cause de l'utilisation de la srollview

const urlParams = new URLSearchParams(window.location.search);
let pageNumber = urlParams.get('page');
//const maxSummonerPerPage = 25;
let data;
$(document).ready(() => {
    fetch(`https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${apiKey}`).then((resp1) => {
        resp1.json().then((res) => {
            //data = res;
            if(res.entries != undefined){
                displayData(res);
            }
        })
    })
})

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
    /*if(!isPageNumberValid(pageNumber, (data.entries.length / maxSummonerPerPage))){
        pageNumber = 1;
    }*/
    for(let i = 0/*((pageNumber - 1) * maxSummonerPerPage)*/; i != data.entries.length/*(pageNumber * maxSummonerPerPage)*/; i++){
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

/*const isPageNumberValid = (pageNumber, maxPageNumber) => {
    if(pageNumber == undefined || isNaN(pageNumber) || pageNumber <= 0 || pageNumber > maxPageNumber)
        return false;
    else
        return true;
}*/