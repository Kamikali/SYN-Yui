const fs = module.require("fs");
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

	if(message.channel.id == '424596241578590209'){

	var msg1, msg2, img, stop = "";
	var friendzone_gifs = [
		"https://media.giphy.com/media/xUPGcpBeXWBgDdJneU/giphy.gif",
		"https://media.giphy.com/media/E5xDdGVFuatoc/giphy.gif",
		"https://media.giphy.com/media/xHwK0JDK5jPwY/giphy.gif",
		"https://media1.tenor.com/images/4b57405b39feb8c9308ac5e31a1413ae/tenor.gif?itemid=4573109"
		];
		chop_gifs = [
		"https://cdn.discordapp.com/attachments/426720025219432470/426720043594940417/giphy.gif",
		"https://cdn.discordapp.com/attachments/426720025219432470/426725835748409344/PeskyGiddyAtlanticbluetang-size_restricted.gif",
		"https://cdn.discordapp.com/attachments/426720025219432470/426720263376470036/fe2.gif",
		"https://cdn.discordapp.com/attachments/426720025219432470/426720551965556746/14ebecdf3f06a4b8466747316151.gif",
		"https://cdn.discordapp.com/attachments/426720025219432470/426720698711539722/798.gif",
		"https://cdn.discordapp.com/attachments/426720025219432470/426720994418229258/9ee775eb96f201f5badc019e43efecac.gif",
		"https://cdn.discordapp.com/attachments/426720025219432470/426738570779164692/giphy_1.gif",
		"https://cdn.discordapp.com/attachments/426720025219432470/426738569072082964/Piggy_karate_chops_Kermit.gif"
		];
		fight_gifs = [
		"https://media.giphy.com/media/l0HekoJsgcjePCH5u/giphy.gif",
		"https://media.giphy.com/media/qpSoWHZjKkxk4/giphy.gif",
		"http://gifimage.net/wp-content/uploads/2017/07/fight-me-gif-16.gif",
		"http://gifimage.net/wp-content/uploads/2017/07/fight-me-gif-7.gif",
		"http://i0.kym-cdn.com/photos/images/original/001/131/353/912.gif",
		"https://m.popkey.co/ac4dbb/Q88dJ.gif",
		"http://i.imgur.com/TBUiYAI.gif",
		"http://iruntheinternet.com/lulzdump/images/world-cup-2014-Mathew-Leckie-Ron-vlaar-fight-me-austalia-1403644911H.gif?id=",
		"https://media.giphy.com/media/BKM3WMdnMQFaM/giphy.gif",
		"https://media1.tenor.com/images/2fad12f24586cf5dc132a22b40cf3a6d/tenor.gif?itemid=8600134",
		"https://media1.tenor.com/images/4fefb212df9e11ce28a42881576a783d/tenor.gif?itemid=3469751",
		"https://media1.tenor.com/images/a726d4d56f2c121644b5f019abe51c06/tenor.gif?itemid=9154612",
		"https://media1.tenor.com/images/b12a73e744399e6c538dff6a65e36f9f/tenor.gif?itemid=4412873",
		"https://media1.tenor.com/images/d8f508428293b9a93b8bad9a67ad45bb/tenor.gif?itemid=5118547",
		"https://media1.tenor.com/images/0494e50c5e2488844d14e5dccd2c39be/tenor.gif?itemid=10565443",
		"https://i.imgur.com/TcEz8OF.gif",
		"https://media1.tenor.com/images/def13dec8ad416dbcbc2514e6c45a712/tenor.gif?itemid=8071585",
		"https://media.giphy.com/media/Sl1lKFZEI4xgY/giphy.gif",
		"https://media.giphy.com/media/rwiTi8b8RExji/giphy.gif", 
		"https://media1.tenor.com/images/f126987ba63e91e641ca9ab53df38b1c/tenor.gif?~>custom add fight itemid=6046519http://img30.laughinggif.com/pic/HTTPS9tZWRpYS50ZW5vci5jby9pbWFnZXMvNzcxODNhOTgxYjcwMWMwMTU4NmI5YjYyMDEwZWYxMmMvcmF3.gif",
		"https://78.media.tumblr.com/ba55d609544b4656c2f639711ccf90a2/tumblr_mio7rnnfDB1rnuzvfo1_500.gif",
		"http://i.imgur.com/Q1TSVzg.gif",
		"http://i.imgur.com/UAdX7iv.gif",
		"http://gifimage.net/wp-content/uploads/2017/07/anime-fight-gif-14.gif",
		"https://i.imgur.com/yqmSX7h.gif",
		"http://www.reactiongifs.com/wp-content/uploads/2013/11/cute-fight.gif",
		"https://media.giphy.com/media/zSbNvl2uGXG1i/giphy.gif"
		]

	if(!args[0]){
		message.channel.send("What can I do for you?");
	} else {
		switch(args[0]){
		case "friendzone":
			img = friendzone_gifs[getRandomInt(0, friendzone_gifs.length -1)];
			msg1 = "you have been friendzoned by"; msg2 = "";
		break;
		case "chop":
			img = chop_gifs[getRandomInt(0, chop_gifs.length -1)];
			msg1 = "you have been chopped by"; msg2 = "";
		break;
		case "fight":
			img = fight_gifs[getRandomInt(0, fight_gifs.length -1)];
			msg1 = ""; msg2 = "wants to fight you!";
		break;
		default:
			message.channel.send("Sorry, I don't know this command >//<");
			stop = "y";
		}
		if(message.mentions.users.first()){
			if(stop != 'y'){
				let embed = new Discord.RichEmbed()
				.setColor(3447003)
				.setDescription(`**${message.mentions.users.first().username}**, ${msg1} **${message.author.username}** ${msg2}`)
				.setImage(img);
			
				message.channel.send(embed);
			}
		} else {
			if(stop != 'y'){
				message.channel.send("You have to mention a user to use this command!");
			}
		}
	}

	} else {
		message.channel.send("Yui is not allowed to spam here :(");
	} 

	function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}	

module.exports.help = {
	name: "ui"
}