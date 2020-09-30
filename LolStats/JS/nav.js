$(document).ready(() => {
    

    let modalIns = $(".modal-ins")[0];
    let modalCon = $(".modal-con")[0];

    let btnIns = $(".ins");
    let btnCon = $(".con");

    let spanIns = $("#close-ins")[0];
    let spanCon = $("#close-con")[0];

    for(let btn of btnIns){
        btn.onclick = () => {
            modalIns.style.display = "block";
        }
    }
    for(let btn of btnCon){
        btn.onclick = () => {
            modalCon.style.display = "block";
        }
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
