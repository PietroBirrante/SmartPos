const db = require('../db');

function Menu(idusr,lang) {    
    this.idusr = idusr;
    this.language = lang;
}

Menu.prototype.getIdusr= function() {
    return this.idusr;
}

Menu.prototype.setIdusr = function(idusr, lang) {
    this.idusr = idusr;
    this.language = lang;
}

Menu.prototype.getMenu = async function() {
   var sql;
   try {
    sql = "select zfunzioni.*, zfunlang.descr descrr from zfunzioni " +
    "left join zfunlang on zfunzioni.cdfun = zfunlang.cdfun " +
    "left join zutefunz on zutefunz.cdfun = zfunzioni.cdfun " +
    "where idusr = $1 " +
    "and lang = $2 " +
    "order by tipo, ordinamento ";
       
       var menu = await db.query(sql, [this.idusr, this.language]);

       return menu;
   } catch(error) {
       console.log(error);
     return error;
   }
}
module.exports = Menu;    