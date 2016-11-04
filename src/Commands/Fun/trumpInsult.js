const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');

module.exports = class RandomCatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'trump-insult',
			aliases: ['insult'],
			group: 'fun',
			memberName: 'trump-insult',
			description: 'Personalized Trump Insult.',
			guildOnly: false,
			examples: ['insult @Suit#6566', 'insult'],
			args: [
				{
					key: 'user',
					prompt: 'Mention a user you want Trump to insult',
					type: 'member',
					default: ''
				}
			]
		});
	}

	async run(msg, args) {
		if (args.user) {
			const member = args.user.user.username;
			const insult = await this.getInsult(member);
			msg.say(`Trump Insult: ***${insult}***`);
		} else {
			const insult = await this.getInsult(msg.author.username.toString());
			msg.say(`Trump Insult: ***${insult}***`);
		}
	}
	async getInsult(user) {
		let res = await fetch(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${user}`);
		let json = await res.json();
		return json.message;
	}
};
