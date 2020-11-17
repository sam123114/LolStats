$(document).ready(() => {
    $('.togFavorite').click((e) => {
        let name = $(e.target).parents('tr')[0].id;
        if(confirm(`Voulez vous vraiment supprimé ${name} de vos favoris`)){
            $(e.target).load("LOGIC/favorite.logic.php", {
                'playerName': name,
                'action': 'remove'
            });
            $(e.target).parents('tr').remove();
        };
    })
})