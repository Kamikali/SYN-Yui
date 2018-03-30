const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.id === '209087615922601984') return message.channel.send("You do not have the permissions to do this!");

	let startTime = Date.now();
	message.channel.send("Ping...").then(newMessage => {
		let endTime = Date.now();
		newMessage.edit("Pong! Took `" + Math.round(endTime - startTime) + "ms`!");
	});
}

module.exports.help = {
	name: "ping"
}