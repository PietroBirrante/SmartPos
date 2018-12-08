const ses = require('electron').remote;

function Storages(str) {    
    this._Users = str;
}

Storages.prototype.setSession = function(str, name) {
    eval("global." + name + " = '" + str + "'");
}

Storages.prototype.getSession = function(name) {
    return eval("ses.getGlobal('" + name + "')");
}

module.exports = Storages;