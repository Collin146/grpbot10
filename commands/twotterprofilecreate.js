const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utils/errors.js");
//const Enmap = require("enmap");
bot.profiles = new Enmap({name: "profiles"});

module.exports.run = async (bot, message, args) => {

const yes = bot.emojis.get("700713527576625205");
const no = bot.emojis.get("700713478578634783"); 
const twotter = bot.emojis.get("727159498686595072");

//let profiles = JSON.parse(fs.readFileSync("./profiles.json", "utf8"));

//    profiles[message.author.id] = {
        //firstname: args[0],
        //lastname: args[1],
        //age: args[2],
        //bio: args.join(" ").slice(2)
        
    //};

    //fs.writeFile("./profiles.json", JSON.stringify(profiles), (err) => {
        //if (err) console.log(err)
    //});
    
    bot.profiles.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      civfname: args[0],
      civlname: args[1],
      age: args[2],
      bio: args.join(" ").slice(2)
    });
    
}

module.exports.help = {
    name: "twotterprofilecreate"
}
