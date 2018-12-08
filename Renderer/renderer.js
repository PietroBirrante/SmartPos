const ipc = require('electron').ipcRenderer
var Utility = require('../Utility/utility.js')
var Storages = require('../model/Storages.js').prototype
var UrlBase64 = ""; 

function getData(){

    var msg = "";
    nom = $("#user").val();
    cog = $("#pwds").val();

    if (nom == ""){
        //document.getElementById('Results').innerHTML = 'USERS REQUIRED';    
        msg = 'Username Obbligatoria';    
        $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
        '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');
        $("#user").focus()
        return;
    }

    if (cog == ""){
        msg = 'Password Obbligatoria';    
        $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
        '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');
        $("#pwds").focus()
        return;
    }

    nom = Utility.GetTrim(nom);
    cog = Utility.GetTrim(cog);
    
    ipc.send('SendParam', nom, cog)
}

function LogOut(){
    
    Storages.setSession(null, '_Users');
    Storages.setSession(null, '_Mails');
    Storages.setSession(null, '_Utente'); 
    Storages.setSession(null, '_Menus');     

    location.href = "../Pages/login.html";
}

ipc.on('ResultError', function (event, str) {
    //$("#Results").html(str);
    msg = str;    
    $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
    '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');
})

ipc.on('MenuCreate', function (event, usr, lan) {
    ipc.send('CreateMenu', usr, lan)
})

function EditProfile(){

    UrlBase64 = $('#img-personal').attr('src');
    usrid = Storages.getSession('_Users');
    password = $('#txt-password').val();
    repassword = $('#txt-rep-password').val();
    nome = $('#txt-name').val();
    cog = $('#txt-surname').val();
    mail = $('#txt-mail').val();

    if (password == ""){
        msg = "Le Password è obbligatoria";
        $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
        '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');    
        $('#txt-password').focus();
        return;
    }

    if (repassword == ""){
        msg = "Le Re-Password è obbligatoria";
        $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
        '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');    
        $('#txt-rep-password').focus();
        return;
    }

    if (nome == ""){
        msg = "Il Nome è obbligatoria";
        $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
        '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');    
        $('#txt-name').focus();
        return;
    }

    if (cog == ""){
        msg = "Il Cognome è obbligatoria";
        $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
        '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');    
        $('#txt-surname').focus();
        return;
    }

    if (mail == ""){
        msg = "La Mail è obbligatoria";
        $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
        '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');    
        $('#txt-mail').focus();
        return;
    }

    if (password != repassword){
        msg = "Le password non sono uguali.";
        $('#Results').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
        '<i class="fa fa-ban-circle"></i><strong>Si &egrave; verificato un errore!</strong><br/>'+msg+'</div>');    
        $('#txt-rep-password').focus();
        return;
    }

    ipc.send('ModifyProfile', usrid, password, nome, cog, mail, UrlBase64)

    $('#img-left').attr('src', UrlBase64);
    $('#img-head').attr('src', UrlBase64);
    var utente = nome + " " + cog;
    $('#mail').html(utente);

    $('#Results').html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
    '<i class="fa fa-ban-circle"></i><strong>Modifica Effettuata con Successo</strong><br/></div>');    

}

function GetProfile(){
    usrid = Storages.getSession('_Users');
    ipc.send('GetProfile', usrid);
}

ipc.on('GetProfileReturns', function (event, nom, cog, mail, foto) {
    
    $('#txt-name').val(nom);
    $('#txt-surname').val(cog);
    $('#txt-mail').val(mail);
    $('#img-personal').attr('src', foto);

})