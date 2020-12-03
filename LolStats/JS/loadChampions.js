let champions;
let error = false;
$(document).ready(async () => {
    
    let freeChampions = await fetchFreeChampionsFromAPI();
    champions = await fetchChampionsFromAPI();
    if(error){
        rateLimitExceeded();
        return;
    }
    freeChampions = freeChampions.freeChampionIds.map(id => getChampionInfosFromId(id));
    displayFreeChampions(freeChampions);
})

const fetchFreeChampionsFromAPI = async () => {
    let result = await fetch(`${urlFetcher}?url=https://na1.api.riotgames.com/lol/platform/v3/champion-rotations`)
        .then(resp => resp.json());
    if(result.status != undefined){
        error = true;
    }
    return result;
}
const fetchChampionsFromAPI = async () => {
    return await fetch('http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/champion.json')
        .then(resp => resp.json());
}
const getChampionInfosFromId = (championId) =>{
    for(let champion in champions.data){
        if(champions.data[champion].key == championId)
            return champions.data[champion];
    }
}
const displayFreeChampions = (freeChampions) => {

    let display = `<div id='champions-container'>`;
    for(let champion of freeChampions)
        display += `<div class='championInfos'>
                        <img src="http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champion.id}.png" class="img">
                        
                        <h5>${champion.id}</h5>
                        <a href='champion.php?name=${champion.id}' class='details'>Détails</a>
                    </div>`;
    display += '</div>';    

    $('#page-content').append(display);
}

const rateLimitExceeded = () => {
    alert("Une erreur est survenue, la limite de requête que nous pouvons envoyer vers les serveur de Riot games a été atteinte. S'il vous plait, réessayer dans quelques minutes.")
}