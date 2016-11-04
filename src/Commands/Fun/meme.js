const giphy = require('giphy-api')();
const { Command } = require('discord.js-commando');

module.exports = class MemeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'meme',
			group: 'fun',
			memberName: 'meme',
			description: 'Displays A Random Meme From Giphy.',
			guildOnly: false
		});
	}

	async run(msg) {
		msg.say('Acquiring meme from the meme lords');
		const meme = await this.getMeme();
		msg.channel.sendFile(meme);
	}
	async getMeme() {
		let meme;
		try {
			let res = await giphy.random('meme');
			meme = res.data.image_original_url;
		} catch (err) {
			console.log('Error Getting Meme');
		}
		return meme;
	}
};
