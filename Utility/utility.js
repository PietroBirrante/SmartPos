module.exports = {

    GetTrim: function (str){

        str = str.replace(/"/g, "");
        var strTrimeers = "";
        var appstrTrimeers = "";

        appstrTrimeers = str.trim();
        strTrimeers = appstrTrimeers.replace(" ","");

        return strTrimeers;
    }

}