const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
	let toSend = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.channels.get(args[0]);

	var msg = "";

	//Baut den Message string zusammen
	for (i = 1; i < args.length; i++) { 
  		msg += args[i];
  		msg += " ";
	}

	toSend.send(msg);

}

module.exports.help = {
	name: "send"
}