const urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('name');
let test = 0;
$(document).ready(async () =>  {
    let infos = await fetchChampionsInfosFromAPI();
    displayInfos(infos.data[name]);
    console.log(infos.data[name]);

    $('.spell img').hover((e) => {
        $(e.target).next('p')[0].style.display = 'block';
    },(e) => {
        $(e.target).next('p')[0].style.display = 'none';
    });
})

const fetchChampionsInfosFromAPI = async () => {
    return await fetch(`http://ddragon.leagueoflegends.com/cdn/10.23.1/data/fr_FR/champion/${name}.json`)
        .then(resp => resp.json());
}
const displayInfos = (infos) => {
    const keys = ['Q','W','E','R'];
    let spells = ` <div id='spells'>
                        <div class='spell'>
                            <img src='//opgg-static.akamaized.net/images/lol/passive/${infos.passive.image.full}'/>
                            <p class='desc'>${infos.passive.description}</p>
                        </div>`;
    for(let i = 0; i < 4; ++i)
        spells += `<div class='spell'>
                        <img title='q' src='//opgg-static.akamaized.net/images/lol/spell/${infos.spells[i].image.full}'/>
                        <p class='desc'>${infos.spells[i].description}</p>
                        <span class='key'>${keys[i]}</span>
                    </div>`;
                    spells += '</div>';
    let allyTips = '<ul>';
    for(let i = 0; i < infos.allytips.length; ++i){
        allyTips += `<li>${infos.allytips[i]}</li>`;
    }
    let enemyTips = '<ul>';
    for(let i = 0; i < infos.enemytips.length; ++i){
        enemyTips += `<li>${infos.enemytips[i]}</li>`;
    }
    enemyTips += '</ul>'
    let content = `<div id='championHeader'>                   
                        <img src="http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${name}.png" class="img">
                        <div id="championDescription">
                            <h2>${name}</h2>
                            <p>${infos.lore}</p>
                            ${spells}                
                        </div>
                    </div>
                    <h2 id='tipsTitle'>Astuces</h2>
                    <div id='tips'>
                        <div id='ally'>
                            <h4>Alliées</h4>
                            ${allyTips}
                        </div>
                        <div id='enemy'>
                            <h4>Ennemis</h4>
                            ${enemyTips}
                        </div>
                    </div>`;
    $('#page-content').append(content);
}
