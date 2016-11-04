const { Command } = require('discord.js-commando');
const fmlAPI = require('random_fml');

module.exports = class RandomFMLCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fml',
			group: 'fun',
			memberName: 'fml',
			description: 'Gives you a random fml.',
			guildOnly: false
		});
	}

	async run(msg) {
		msg.say(await this.getFML());
	}
	async getFML() {
		let fml;
		try {
			fml = await fmlAPI();
			return fml;
		} catch (err) {
			console.log('Error Getting FML');
		}
		return fml;
	}
};
