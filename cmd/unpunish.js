const fs = require("fs");

module.exports.run = async (bot, message, args, currentTime) => {
	
	if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.channel.send("You do not have the permission to do this.");

	let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if(!toMute) return message.channel.send("You did not mention a user.");

	let role = message.guild.roles.find(r => r.name === "punished by Yui");

	if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!");

	await toMute.removeRole(role);


  	delete bot.mutes[toMute.id];

  	fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
 		if(err) throw err;
 		console.log(`[${currentTime}] ${message.author.tag} has unpunished ${toMute.user.tag}!`);
  	});

	message.channel.send("This user now unpunished desu!");
	return;
}

module.exports.help = {
	name: "unpunish"
}