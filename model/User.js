const db = require('../db');

function User(idusr, pwd) {    
    this.idusr = idusr;
    this.pwd  = pwd;
}

User.prototype.getIdusr= function() {
    return this.idusr;
}

User.prototype.setIdusr = function(idusr) {
    this.idusr = idusr;
}

User.prototype.getPwd = function() {
    return this.pwd;
}

User.prototype.setPwd = function(pwd) {
    this.pwd = pwd;
}

User.prototype.getNome = function() {
    return this.nome;
}

User.prototype.setNome = function(nome) {
    this.nome = nome;
}

User.prototype.getCog = function() {
    return this.cog;
}

User.prototype.setCog = function(cog) {
    this.cog = cog;
}

User.prototype.getMail = function() {
    return this.mail;
}

User.prototype.setMail = function(mail) {
    this.mail = mail;
}

User.prototype.getImg = function() {
    return this.img;
}

User.prototype.setImg = function(img) {
    this.img = img;
}

User.prototype.getAll = async function() {
    const sql = 'SELECT * FROM zutenti';
    try {
      const { rows } = await db.query(sql);
      return rows;
    } catch(error) {
      return error;
    }
}

User.prototype.getUser = async function() {
    const text = 'SELECT * FROM zutenti WHERE idusr = $1 and pwd = $2';
    try {
      const { rows } = await db.query(text, [this.idusr, this.pwd]);
      return rows;
    } catch(error) {
      return error;
    }
}

User.prototype.setProfile = async function() {
    const text = 'update zutenti set pwd = $2, nome = $3, cogn = $4, mail = $5, foto = $6 WHERE idusr = $1 ';
    try {
      const { rows } = await db.query(text, [this.idusr, this.pwd, this.nome, this.cog, this.mail, this.img]);
      return rows;
    } catch(error) {
      return error;
    }
}

User.prototype.getProfile = async function() {
    const text = 'SELECT * FROM zutenti WHERE idusr = $1 ';
    try {
      const { rows } = await db.query(text, [this.idusr]);
      return rows;
    } catch(error) {
      return error;
    }
}


module.exports = User;    