const Commando = require('discord.js-commando');
const path = require('path');
const { oneLine } = require('common-tags');
const authToken = require('../Configuration/auth.json').discord.token;

// Import Event Listeners
const readyEvent 							= require('./Events/Status/ready.js');
const errorEvent 							= require('./Events/Status/error.js');
const disconnectEvent 				= require('./Events/Status/disconnect.js');
const reconnectEvent 					= require('./Events/Status/reconnect.js');
const messageEvent 						= require('./Events/Message/messageCreate.js');
const guildCreateEvent 				= require('./Events/Guild/guildCreate.js');
const guildDeleteEvent 				= require('./Events/Guild/guildDelete.js');
const guildUpdateEvent 				= require('./Events/Guild/guildUpdate.js');
const guildBanAddEvent 				= require('./Events/Guild/guildBanAdd.js');
const guildBanRemEvent 				= require('./Events/Guild/guildBanRemove.js');
const guildMemberAddEvent 		= require('./Events/Guild/guildMemberAdd.js');
const guildMemberRemoveEvent	= require('./Events/Guild/guildMemberRemove.js');

const bot = new Commando.Client({
	owner: '188505107057475585',
	selfbot: false,
	commandPrefix: '/',
	unknownCommandResponse: false,
	invite: 'https://discord.gg/fjrJx87'
});

// Discord.js Event Listeners
bot.on('debug',  							(payload) => 			{ console.log(payload);						})
		.on('warn',								(payload) => 			{ console.warn(payload);					})
		.on('error', 							(payload) => 			{ errorEvent(payload);						})
		.on('message', 						(payload) => 			{ messageEvent(payload);					})
		.on('guildCreate', 				(payload) => 			{ guildCreateEvent(payload);			})
		.on('guildDelete', 				(payload) => 			{ guildDeleteEvent(payload);			})
		.on('guildUpdate', 				(oG, nG) => 			{	guildUpdateEvent(oG, nG);				})
		.on('guildBanAdd', 				(guild, user) => 	{ guildBanAddEvent(guild, user);	})
		.on('guildBanRemove',			(guild, user) => 	{ guildBanRemEvent(guild, user);	})
		.on('guildMemberAdd',			(member) => 			{ guildMemberAddEvent(member);		})
		.on('guildMemberRemove',	(member) => 			{ guildMemberRemoveEvent(member);	})
		.on('ready', 							() => 						{ readyEvent(bot);								})
		.on('disconnect', 				() => 						{ disconnectEvent();							})
		.on('reconnect', 					() => 						{ reconnectEvent(); 							});

// Commando Event Listeners
bot.on('commandError', (cmd, err) => {
	if (err instanceof Commando.FriendlyError) return;
	console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
});

bot.on('commandBlocked', (msg, reason) => {
	console.log(oneLine`
		Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
		blocked; ${reason}
	`);
});

bot.on('commandPrefixChange', (guild, prefix) => {
	console.log(oneLine`
		Prefix changed to ${prefix || 'the default'}
		${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
	`);
});

bot.on('commandStatusChange', (guild, command, enabled) => {
	console.log(oneLine`
		Command ${command.groupID}:${command.memberName}
		${enabled ? 'enabled' : 'disabled'}
		${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
	`);
});

bot.on('groupStatusChange', (guild, group, enabled) => {
	console.log(oneLine`
		Group ${group.id}
		${enabled ? 'enabled' : 'disabled'}
		${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
	`);
});

const options = {
	help: true,
	commandState: false
};

bot.registry
	.registerGroups([
		['info', 'Info'],
		['fun', 'Fun'],
		['music', 'Music'],
		['admin', 'Admin']
	])
	.registerDefaultGroups()
	.registerDefaultCommands(options)
	.registerCommandsIn(path.join(__dirname, 'Commands'));

const TOKEN = process.env.DISCORD_TOKEN || authToken;
bot.login(TOKEN);

process.on('unhandledRejection', err => {
	console.error(`Uncaught Promise Error:\n ${err.stack}`);
});
