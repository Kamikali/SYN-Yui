const fs = module.require("fs");

module.exports.run = async (bot, message, args, currentTime) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the permissions to do this!");

	//User objekt by ID oder Usertag
	let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.send("You did not mention a user.");

		//Hat der Benutzer die Rechte um zu punishen?
		if(toMute.id === message.author.id) return message.channel.send("You cannot punish yourself!");
		if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot punish a user with the same or higher role then you!");

		let role = message.guild.roles.find(r => r.name === "punished by Yui");
		//Kreiert Rolle falls diese nicht existiert
		if(!role){
			try {
			//Hier entsteht die Rolle
			role = await message.guild.createRole({
				name: "punished by Yui",
				color: "#ffffff",
				permissions: []
			});
			//Loopt durch die Kanäle und deaktiviert perms für die neue Rolle
			//message.guild.channels.forEach(async (channel, id) => {
			//	await channel.overwritePermissions(role, {
			//		SEND_MESSAGES: false,
			//		ADD_REACTIONS: false,
			//		CONNECT: false
			//	});
			//});
			message.channel.send("Created punished role!");
			console.log(`[${currentTime}] I have created the punished role!`);
			} catch(e) {
				console.log(e.stack);
			}
		}


		if(toMute.roles.has(role.id)) return message.channel.send("This user is already punished!");
		//get ID des Servers und Zeit des unpunishs
		bot.mutes[toMute.id] = {
			guild: message.guild.id,
			time: Date.now() + parseInt(args[1]) * 3600000
		}
		//Gibt die punished Rolle
		await toMute.addRole(role);


		var banHours = args[1], banDays = 0;
		var dispDays = false;
		if(args[1] >= 24){
			dispDays = true;
			banHours = args[1]%24;
			banDays = (args[1] - banHours)/24;
		}

		//Schreibe in das JSON Dokument
		fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
			if(err) throw err;
			message.channel.send("I have punished this user!");
			console.log(`[${currentTime}] ${message.author.tag} has punished ${toMute.user.tag} for ${banDays} days and ${banHours} hours!`);
		});

		//Teilt dem Nutzer den Grund fuer das Punishment mit.
		if(!dispDays){
			toMute.send(`You have been temporarily punished on Synergy. You will not be able to send text messages or speak in voice chats for ***${banHours} hours*** from now.`);
		} else {
			if(banHours == 0){
				toMute.send(`You have been temporarily punished on Synergy. You will not be able to send text messages or speak in voice chats for ***${banDays} days*** from now.`);
			} else {
				toMute.send(`You have been temporarily punished on Synergy. You will not be able to send text messages or speak in voice chats for ***${banDays} days*** and*** ${banHours} hours*** from now.`);
			}
		}
		switch (args[2]) {
			case "1":
			toMute.send("Reason: ***Rule #1*** - No bullying or blackmailing of any sort.");
			break;
			case "2":
			toMute.send("Reason: ***Rule #2:*** Synergy is an english speaking community so try to adapt! If you're looking for a certain region server, sadly we are not the right server");
			break;
			case "3":
			toMute.send("Reason: ***Rule #3:*** No spamming in any of the channels except for #memes  #tag and #animals.");
			break;
			case "4":
			toMute.send("Reason: ***Rule #4:*** No hate speech, racism, sexism or toxicity.");
			break;
			case "5":
			toMute.send("Reason: ***Rule #5:*** No politics or religion.");
			break;
			case "6":
			toMute.send("Reason: ***Rule #6:*** Be respectful to each other.");
			break;
			case "7":
			toMute.send("Reason: ***Rule #7:*** If a joke or topic turns toxic or gets out of control, the mods have the permission to remove those causing trouble.");
			break;
			case "8":
			toMute.send("Reason: ***Rule #8:*** Pornographic images or obscene materials are not allowed. Do not link to any illegal material such as material that is protected by copyright.");
			break;
			case "9":
			toMute.send("Reason: ***Rule #9:*** No information or images of others than yourself, We respect everyone's privary.");
			break;
			case "10":
			toMute.send("Reason: ***Rule #10:*** No unnecessary mentioning of staff members!");
			break;
			case "0":  //CUSTOM BAN GRUND
			var msg = "";
			//Baut den Message string zusammen
			for (i = 3; i < args.length; i++) { 
  				msg += args[i];
  				msg += " ";
			}
			toMute.send(`Reason: ***${msg}***`);
			break;
			default:
			toMute.send("Reason: ***Reason not given.***");
		}
}

module.exports.help = {
	name: "punish"
}