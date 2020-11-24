$(document).ready(() => {
    $('.dev .img').hover((e) => {
        $(e.target).children('p')[0].style.display = 'block';
    },(e) => {
        $(e.target).children('p')[0].style.display = 'none';
    });
})