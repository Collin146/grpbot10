const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => { 

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    if(args[0] === "help"){
        message.reply("Usage: !strike2 <user> <time length> <reason>");
        return;
    }
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to do that.");
    if(args[0] == "help"){
        message.reply("Usage: !strike2 <user> <time length> <reason>");
        return;
    }
    //te

let tostrike = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!tostrike) return message.reply("Couldn't find that user.");
let kReason = args.join(" ").slice(22);
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to do that.");
if(tostrike.hasPermission("ADMINISTRATOR")) return message.reply("You cannot strike a Moderator or higher");
let strikerole = message.guild.roles.find(`name`, "Strike 2");
let mentioned = message.mentions.users.first();

//start of create role
if (!strikerole){
    try{
        strikerole = await message.guild.createRole({
            name: "Strike 2",
            color: "#000000",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(strikerole, {
            });
        });

    }catch(e){
        console.log(e.stack);
    }
}
//end of create role
let striketime = args[1];
if(!striketime) return message.reply("You didn't specify a time!");

let strikeEmbed = new Discord.RichEmbed()
.setTitle("A user has been striked!")
.setColor("#ff0c00")
.addField("Striked User", `<@${tostrike.id}>`)
.addField("Strike Type", "Strike 2")
.addField("Length & Reason", kReason); //add reason before able to use this.

await (tostrike.addRole(strikerole.id), (kReason));
message.reply(strikeEmbed);

setTimeout(function(){
    tostrike.removeRole(strikerole.id);
    message.channel.send(`<@${tostrike.id}> has been removed from Strike 2!`);
}, ms(striketime));

let ModEmbed = new Discord.RichEmbed()
.setTitle("Strike 2 command used!")
.setColor("RED")
.addField("Striked User", `<@${tostrike.id}>`, true)
.addField("Striked In", message.channel, true)
.addField("Length & Reason", kReason, true)
.addField("Striked By", message.author.username, true);

let warnchannel = message.guild.channels.find(`name`, "modlog");
if(!warnchannel) return message.reply("Couldn't find channel");

warnchannel.send(ModEmbed);

let DMembed = new Discord.RichEmbed()
.setTitle("You have been striked in Global Roleplay™ PS4")
.setColor("#ff0c00")
.addField("Strike Type", "Strike 2")
.addField("Length & Reason", kReason);
 
mentioned.send(DMembed);

//end of module
}

module.exports.help = {
    name: "strike2"
}

