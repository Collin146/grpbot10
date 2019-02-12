const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => { 

console.log("yup")
const logs = message.guild.channels.find(channel => channel.name === "logs");
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
      message.guild.createChannel('logs', 'text');
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
      console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
    }  
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    let user = ""
      if (entry.extra.channel.id === message.channel.id
        && (entry.target.id === message.author.id)
        && (entry.createdTimestamp > (Date.now() - 5000))
        && (entry.extra.count >= 1)) {
      user = entry.executor.username
    } else { 
      user = message.author.username
    }
    logs.send(`A message was deleted in ${message.channel.name} by ${user}`);
  }

module.exports.help = {
    name: "deletedmessageslog"
}
