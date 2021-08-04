const controller_object = {};
const fs = require('fs');
const pdfParser = require('pdf2json')

controller_object.contoh_fungsi = async(req, res, next) => {
    string1="string1";
    string2="string2 is here";
        changepercent(string1,string2);
    }
    
    function changepercent(string1,string2) {
    
        var s1Parts= string1.split(' ');
        var s2Parts= string2.split(' ');
    
        var matched = 0;
    
    for(var i = 0; i<s1Parts.length; i++)
    {
        for(var j = 0; j<s2Parts.length; j++)
            {
            if(s1Parts[i] === s2Parts[j])
                matched++;   
            }
    
    }
        var percentage=(matched/Math.max(s1Parts.length, s2Parts.length))*100;
    
        console.log(matched);
        console.log(percentage);
    if(percentage<50)
    {
        console.log("Change Above 50%");
    }
};

module.exports = controller_object;