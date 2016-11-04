const { stripIndents } = require('common-tags');
const { Command } = require('discord.js-commando');
const version = require('../../../package.json').version;
const discordV = require('../../../node_modules/discord.js/package.json').version;
const commandoV = require('../../../node_modules/discord.js-commando/package.json').version;
const moment = require('moment');
require('moment-duration-format');

module.exports = class StatsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			group: 'util',
			aliases: ['status', 'about'],
			memberName: 'stats',
			description: 'Displays Some Information About The Bot.',
			guildOnly: false
		});
	}

	async run(msg) {
		let duration = moment.duration(this.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
		const commands = this.client.registry.findCommands();

		msg.code('LDIF', stripIndents`
		# STATISTICS
		Uptime     	: ${duration}
		Mem Usage  	: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB

		# SERVING
		Servers    	: ${this.client.guilds.size}
		Channels   	: ${this.client.channels.size}
		Users      	: ${this.client.users.size}

		# BOT INFORMATION
		Owner      	: Suit#6566
		Version    	: V ${version}
		Library    	: Discord.js V ${discordV}
		Framework  	: Discord.js Commando V ${commandoV}
		Commands   	: ${commands.size} Total Commands
		`);
	}
};
