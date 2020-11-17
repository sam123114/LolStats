$(document).ready(() => {
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

const arrowToggle = (e, matchList) => {
    const match = matchList[e.id];
    const {participantIdentities,participants} = match;
    const gameDuration = match.gameDuration/60;
    let extraInfos = `<div class='matchExtraInfo'><table class="table table-striped table-dark">
                    <tr>
                        <th colspan="3">Victoire Équipe Bleu</th>
                        <th>KDA</th>
                        <th>Dégats</th>
                        <th>CS</th>
                        <th>Objet</th>
                    </tr>`;
    for(let i = 0; i < 10; ++i){
        let stats = participants[i].stats
        let KDA = `${stats.kills}/${stats.deaths}/${stats.assists}`;
        let itemsId =  [
            stats.item0,
            stats.item1,
            stats.item2,
            stats.item3,
            stats.item4,
            stats.item5,
            stats.item6,
        ]
        let items = '';
        for(let j = 0; j < itemsId.length; ++j){
            if(itemsId[j] == 0)
                items += `<img src='IMG/NoImage.png'/>`;
            else
                items += `<img src="//opgg-static.akamaized.net/images/lol/item/${itemsId[j]}.png?image=q_auto,w_22&v=1601445791"/>`;
        }
        if(i == 5)
            extraInfos+= `</table><table class="table table-striped table-dark">
                        <tr>
                            <th colspan="3">Défaite Équipe Rouge</th>
                            <th>KDA</th>
                            <th>Dégats</th>
                            <th>CS</th>
                            <th>Objet</th>
                        </tr>`;
        extraInfos += `<tr>
                        <td><img src='//opgg-static.akamaized.net/images/lol/champion/${getChampionNameById(participants[i].championId)}.png?image=q_auto,w_46&v=1601445791'/></td>
                        <td>
                            <div class='playerSpells'>
                                <img src="//opgg-static.akamaized.net/images/lol/spell/${getSpellNameById(participants[i].spell1Id).id}.png?image=q_auto,w_22&v=1601445791" class="spell"/>
                                <img src="//opgg-static.akamaized.net/images/lol/spell/${getSpellNameById(participants[i].spell2Id).id}.png?image=q_auto,w_22&v=1601445791" class="spell"/>
                            </div>   
                        </td>
                        <td>${participantIdentities[i].player.summonerName} </td>
                        <td>${KDA}</td>
                        <td>${stats.totalDamageDealtToChampions}</td>
                        <td>
                            <div class='minionKilled'>
                                <p>${stats.totalMinionsKilled}</p>
                                <p>${(stats.totalMinionsKilled/gameDuration).toFixed(1)} par minute</p>
                            </div>
                        </td>
                        <td>
                            <div class='playerItems'>
                                ${items}
                            </div>
                        </td>
                    </tr>`;
    }
    extraInfos += '</table></div>';
    let element = $(extraInfos).hide();
    let arrow = $(e).children()[0];
    arrow.classList.toggle('upArrow');
    if(arrow.classList.contains('upArrow')){
        let matchContainer = $(e).parents('.matchContainer');
        matchContainer.append(element);
        element.show('slow');
    }
    else{
        $(e).parents('.matchContainer').children('.matchExtraInfo').remove();
    }
}