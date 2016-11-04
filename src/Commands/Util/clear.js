const { Command } = require('discord.js-commando');

module.exports = class RandomCatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clear',
			aliases: ['clean', 'purge', 'prune'],
			group: 'util',
			memberName: 'clear',
			description: 'Deletes A Given Amount Of Messages',
			guildOnly: true,
			examples: ['clear all', 'clear 20'],
			argsType: 'multiple',
			argsCount: 2
		});
	}

	hasPermission(msg) {
		return msg.member.hasPermission('MANAGE_MESSAGES');
	}

	async run(msg, args) {
		if (!args[0] || isNaN(args[0])) {
			return msg.say(`${msg.author}, atleast provide me with a number!`);
		}
		const limit = 100;
		let max;
		if (args[0] === 'all') {
			max = 100;
		} else {
			max = parseInt(args[0]);
			if (max > limit) { msg.reply(`Can't delete more than 100 messages`); }
		}
		return msg.channel.fetchMessages({ limit: max, before: msg.id })
			.then(messages => {
				msg.channel.bulkDelete(messages).catch(error => console.log(error));
			})
			.then(() => {
				msg.say(`I cleaned up the number of messages you requested, ${msg.author}.`)
					.then(sentMessage => {
						sentMessage.delete(4000);
					});
			})
			.catch(error => {
				console.log(error);
			});
	}
};
