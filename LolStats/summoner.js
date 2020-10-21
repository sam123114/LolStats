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