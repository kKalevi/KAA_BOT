const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');

module.exports = class RandomCatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			group: 'fun',
			memberName: 'cat',
			description: 'Shows you a random picture of a cat.',
			guildOnly: false
		});
	}

	async run(msg) {
		msg.channel.sendFile(await this.getCat(), 'cat.gif', 'Meow');
	}
	async getCat() {
		let res = await fetch('http://random.cat/meow');
		let json = await res.json();
		return json.file;
	}
};
