const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

var Utility = require('./Utility/utility.js')
const db = require('./db')
var User = require('./model/User');
var Menu = require('./model/Menu');
var Storages = require('./model/Storages.js').prototype;
var md5 = require('md5');
var path = require('path')

let mainWindow
var _Users = "";
var _Mails = "";
var _Menu = "";

function createWindow () {
  mainWindow = new BrowserWindow({width: 1100, height: 900, icon: path.join(__dirname, 'assets/img/app-icon/64x64.png')})
  mainWindow.setMenu(null)
  mainWindow.loadFile('./Pages/login.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('closed', function () {
  mainWindow = null
})


ipc.on('SendParam', function (event, nom, cog) {

var username = nom.toUpperCase();
var password = md5(cog);
var message;
var name = "", cogn = "", mail = "", lang="", menus="";
try {
  var user = new User();

  var utente = "";
  
  user.setIdusr(username);
  user.setPwd(password);
  user.getUser().then(function(result) {

    if(result.length==0) {

      message = 'Username o Password Errata'
      event.sender.send('ResultError', message);

    }else {

      var message = 'Welcome '+username;
      name = result[0].nome;
      cogn = result[0].cogn;  
      utente = name + " " + cogn;
      mail = result[0].mail;
      lang = result[0].language;
      img = result[0].foto;

      Storages.setSession(username, '_Users');
      Storages.setSession(mail, '_Mails');
      Storages.setSession(utente, '_Utente');       
      Storages.setSession(lang, '_Lang');       
      Storages.setSession(img, '_Img');       

      event.sender.send('MenuCreate', username, lang);
    }
  })

}
catch(err) {
  console.log(err)
  mainWindow.loadFile('./err/error-500.html', {message: err});
}  


})

ipc.on('CreateMenu', function (event, username, lang) {
  
  var menu = new Menu();

  menu.setIdusr(username, lang);

  menu.getMenu().then(function(result) {     
  var ln =  JSON.stringify(result.rowCount);
  var _menu="", _menuinizio="", _menufine="", _Menu="";
  
  _menuinizio = '<ul class="nav"> ' +
                    '<li class="has-sub active"> ' +
                      '<a href="./index.html"> ' +
                      '<i class="fa fa-laptop"></i> ' +
                      '<span>Dashboard</span> ' +
                      '</a> ' +
                    '</li> ' ;

  for (i=0; i < ln; i++){

    var cdfun =  JSON.stringify(result.rows[i].cdfun);
    var descr =  JSON.stringify(result.rows[i].descrr);
      if (descr != "null"){
          //descr = Utility.GetTrim(descr);
      }
    var percorso =  JSON.stringify(result.rows[i].percorso);
      if (percorso != "null"){
        percorso = Utility.GetTrim(percorso);
      }
    var icon =  JSON.stringify(result.rows[i].icon);
      if (icon != "null"){
        //icon = Utility.GetTrim(icon);
      }
    var pather =  JSON.stringify(result.rows[i].pather);
    var ordinamento =  JSON.stringify(result.rows[i].ordinamento);

          if (ordinamento == -1){
                                              
              if (_menu == ""){
                _menu = '<li class="nav-header">'+descr.replace('"','').replace('"','')+'</li> ';
              }else{
                _menu += '</ul><ul class="nav"><li class="nav-header">'+descr.replace('"','').replace('"','')+'</li>'; 
              }

          }else{
          
              if (pather == '"RAD"'){
                if (result.rows[i-1].pather == 'SON') {
                    _menu += '</ul></li>';
                }
                

                _menu +=  '<li class="has-sub"> ' +
                            '<a> ' +
                              '<b class="caret pull-right"></b> ' +
                              '<i class="'+icon.replace('"','').replace('"','')+'"></i> ' + 
                              '<span>'+descr.replace('"','').replace('"','')+'</span> ' +
                            '</a> <ul class="sub-menu"> ' ;
              }else{

                if (percorso == null){
                  percorso = '';
                }else{
                  percorso = Utility.GetTrim(percorso);
                }

                if (pather == '"SON"'){
                      _menu += '<li><a href="'+percorso+'"><i class="'+icon.replace('"','').replace('"','')+'"></i> '+descr.replace('"','').replace('"','')+'</a></li> ';
                }else{
                      if (result.rows[i-1].pather == 'SON') {
                          _menu += '</ul></li>';
                      }
                      _menu += '<li><a href="'+percorso+'"><i class="'+icon.replace('"','').replace('"','')+'"></i><span>'+descr.replace('"','').replace('"','')+'</span></a></li> ';
                }
              }


          }           

  }
                                    
        _menufine = '<li><a href="#" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li> </ul> ' ;
        menus = _menuinizio + _menu + _menufine;  

        Storages.setSession(menus, '_Menus');  
        mainWindow.loadFile('./Pages/index.html');
          });

            
})      

ipc.on('ModifyProfile', function (event, username, password, nome, cog, mail, img) {

  var username = username.toUpperCase();
  var password = md5(password);
  var nome = nome.toUpperCase();
  var cog = cog.toUpperCase();
  var mail = mail.toUpperCase();
  var img = img;
  var utente = nome + " " + cog;

  try {
    var user = new User();
    
    user.setIdusr(username);
    user.setPwd(password);
    user.setNome(nome);
    user.setCog(cog);
    user.setMail(mail);
    user.setImg(img);
    user.setProfile().then(function(result) {})

    Storages.setSession(img, '_Img');
    Storages.setSession(utente, '_Utente'); 
  
  }
  catch(err) {
    console.log(err)
    mainWindow.loadFile('./err/error-500.html', {message: err});
  }  
  
  
  })
  
  ipc.on('GetProfile', function (event, username) {

    var username = username.toUpperCase();
  
    try {
      var user = new User();
      
      user.setIdusr(username);
      user.getProfile().then(function(result) {

        var name = result[0].nome;
        var cogn = result[0].cogn;  
        var mail = result[0].mail;
        var foto = result[0].foto;
  
        event.sender.send('GetProfileReturns', name, cogn, mail, foto);

      })
    
    }
    catch(err) {
      console.log(err)
      mainWindow.loadFile('./err/error-500.html', {message: err});
    }  
    
    
  })
    