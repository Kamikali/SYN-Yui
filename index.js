const Discord = require('discord.js');
const bot = new Discord.Client({
	disableEveryone: true
});
const fs = require("fs");

var toDel = [];
var myTimer;



bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir("./cmd/", (err, files) => {
	if(err) console.error(err);

	let jsFiles = files.filter(f => f.split(".").pop() === "js")
	if(jsFiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}

	console.log(`[${displayTime()}] Loading ${jsFiles.length} commands`)

	jsFiles.forEach((f, i) => {
		let props = require(`./cmd/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on('ready', () => {

	bot.user.setActivity('Wiping Synergy')

	console.log(`[${displayTime()}] I am now online and ready to work!`);

  	bot.setInterval(() => {
  	
  	for(let i in bot.mutes) {
  		let time = bot.mutes[i].time;
  		let guildId = bot.mutes[i].guild;
  		let guild = bot.guilds.get(guildId);
  		let member = guild.members.get(i);
  		let mutedRole = guild.roles.find(r => r.name === "punished by Yui");
  		if(!mutedRole) continue;

  		if(Date.now() > time) {

  			console.log(`[${displayTime()}] ${member.user.tag} is now able to be unmuted!`);

  			member.removeRole(mutedRole);
  			delete bot.mutes[i];

  			fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
  				if(err) throw err;
  				console.log(`[${displayTime()}] I have unpunished ${member.user.tag}.`);
  			});
  		}
  	}
  }, 5000);


});



bot.on("message", async message => {
	if(message.channel.type === "dm")return;



//REMOVE LINKS IN GENERAL
if(message.channel.id === '420832272963338251' && !message.member.hasPermission("MANAGE_MESSAGES")){
	var detectLink =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.exec(message.cleanContent);
    if(detectLink != null){
        message.delete().then(message => {
            message.channel.send(`<@${message.author.id}> Sorry, you are not allowed to send links here!`).then(message => {
            	message.delete(7000);
            });
        });
    }
}


	//KEEP ART AND SELFIES CLEAN
	if(message.channel.id === '421347730191810601' || message.channel.id === '420926076483796992'){  //this is the #selfie channel's ID
		let hasPic = message.attachments.array();



		if(hasPic.length == 0 && message.content.indexOf("http")) toDel.push(message);
		clearInterval(myTimer);
		myTimer = bot.setInterval(() => {
  	 		for(i = 0; i < toDel.length; i++){
  				try {
  					toDel[i].delete();
  				}
  				catch(e){}
  			}
  		console.log(`[${displayTime()}] I have deleted ${toDel.length} spam messages!`);
  		toDel = [];
  		clearInterval(myTimer);
  		}, 900000); //cleans channels every 15 minutes (900k ms)
	}

	//Ignore bot messages
	if(message.author.bot)return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(!command.startsWith("Y"))return;

	let cmd = bot.commands.get(command.slice(1));
	if(cmd) cmd.run(bot, message, args, displayTime());

});

function displayTime() {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
}

//SYNERGY YUI
bot.login('NDI3NTY2ODQxOTY4NDU5Nzg2.DZqCQg.iYGj1lQA-Uz2j1ZXaTfGhZPxMzw');
//TESTING YUI
//bot.login('NDI2NDUzMDkzNDUwNzc2NTg2.DZp45g.4UGaEhDvc6KzpX53HBbQw4PEYMw');