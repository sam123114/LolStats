$(document).ready(function() {
    $('#formIns').validate({
        rules: {
            nom: {
                required: true,
            },
            emailIns: {
                required: true,
                email: true
            },
            pwIns: {
                required: true,
                minlength: 5
            },
            pwc: {
                required: true,
                minlength: 5,
                equalTo: '#pw'
            }
        },
        messages: {
            nom: {
                required: "Ce champ est requis"
            },
            emailIns: {
                email: 'Veuillez entrer un email valide',
                required: "Ce champ est requis"
            },
            pwIns: {
                minlength: "Le mot de passe doit contenir un minimum de 5 caractères",
                required: "Ce champ est requis"
            },
            pwc: {
                equalTo: 'Le mot de passe de confirmation ne correspont pas au mot de passe',
                required: "Ce champ est requis"
            } 
        },
    });
    $('#formCon').validate({
        rules: {
            emailCon: {
                required: true,
                email: true
            },
            pwCon: {
                required: true,
                minlength: 5
            },
        },
        messages: {
            emailCon: {
                required: "Ce champ est requis"
            },
            pwCon: {
                required: "Ce champ est requis"
            },
        },
    });
    $('#formModify').validate({
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            pw: {
                required: true,
                minlength: 5
            },
            npw: {
                required: true,
                minlength: 5,
            }
        },
        messages: {
            name: {
                required: "Ce champ est requis"
            },
            email: {
                email: 'Veuillez entrer un email valide',
                required: "Ce champ est requis"
            },
            pw: {
                minlength: "Le mot de passe doit contenir un minimum de 5 caractères",
                required: "Ce champ est requis"
            },
            npw: {
                minlength: "Le mot de passe doit contenir un minimum de 5 caractères",
                equalTo: 'Le mot de passe de connfirmation ne correspont pas au mot de passe',
                required: "Ce champ est requis"
            } 
        },
    });
    $('#submitIns').click(() =>{
        if($('#formIns').valid()){
            $('#formIns').submit();
        }

    })
});