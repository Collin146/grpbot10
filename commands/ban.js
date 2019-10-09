const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args, channel) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");
    if(args[0] === "help"){
        message.reply("Usage: !ban <user> <reason");
        return;
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to do that.");
    if(args[0] == "help"){
        message.reply("Usage: !ban <user> <reason>");
        return;
    }
    
let user = args[0];
const usercheck = bot.users.get(user) || message.guild.member(message.mentions.users.first())
if (!usercheck) return message.channel.send("Couldn't find this user.")
const yes = bot.emojis.get("561106357131018273");
const no = bot.emojis.get("561106624757104640");    
let bReason = args.slice(1).join(" ");
const username = bot.fetchUser(user)

message.guild.fetchBans().then(bans => {
            bans.forEach(user => {
                console.log(user.username + '#' + user.tag);
//                message.guild.ban(user);
                  message.guild.member(user).ban(bReason || "None") || message.guild(user).ban(bReason || "None");
                // if (!user) return message.channel.send("Couldn't find this user!")
            });
        });


let geluktEmbed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTitle(`${yes} **Done!**`)
      .setDescription(`<@${user}> has been banned!`)
      .setFooter(`Mentioned User ID: ${user}`);

    message.channel.send(geluktEmbed);

    let ModEmbed = new Discord.RichEmbed()
    .setTitle("**Administration Command Used!**")
    .setTimestamp()
    .setColor("BLACK")
    .setDescription([
        `**The administration command** !ban **has been used**`,
        ` `,
        `**Banned User:** <@${user}>`,
        ` `,
        `**Used In:** ${message.channel}`,
        ` `,
        `**Used By:** ${message.author.username}`,
        ` `,
        `**Reason For Ban:** ${bReason || "None"}`
      ].join('\n'))
    .setFooter(`Message ID: ${message.id} | Author ID: ${message.author.id}`);

let modlogchannel = message.guild.channels.find(x => x.name === 'modlog');
modlogchannel.send({embed: ModEmbed});


   // let dmembed =  new Discord.RichEmbed()
  //  .setTitle(`**You have been unbanned from ${message.guild.name}.**`)
  //  .setColor("#00fff6")
  //  .addField("Reason:", bReason || "None");

    //username.send(dmembed);
}

 module.exports.help = {
     name: "ban"
 }
