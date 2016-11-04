const { Command } = require('discord.js-commando');

module.exports = class StatsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'util',
			memberName: 'invite',
			description: 'Displays the link to invite the bot to your server.',
			guildOnly: false
		});
	}

	async run(msg) {
		const joinLink = 'https://goo.gl/UJjDMC';
		msg.say(`**Invite Link:** ${joinLink}`);
	}
};
