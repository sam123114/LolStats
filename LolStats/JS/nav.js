$(document).ready(() => {
    let modalIns = $(".modal-ins")[0];
    let modalCon = $(".modal-con")[0];

    let btnIns = $("*#ins")[0];
    let btnCon = $("#con")[0];

    let spanIns = $("#close-ins")[0];
    let spanCon = $("#close-con")[0];

    btnIns.onclick = function() {
        modalIns.style.display = "block";
    }
    btnCon.onclick = function() {
        modalCon.style.display = "block";
    }

    spanIns.onclick = function() {
        modalIns.style.display = "none";
    }
    spanCon.onclick = function() {
        modalCon.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalIns || event.target == modalCon) {
            modalIns.style.display = "none";
            modalCon.style.display = "none";
        }
    }
})
