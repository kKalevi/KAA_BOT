const { Command } = require('discord.js-commando');

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			group: 'fun',
			memberName: '8ball',
			description: 'Predicts the answer to a question.',
			guildOnly: false
		});
	}

	async run(msg) {
		const RESPONSES = [
			'it is certain.',
			'it is decidedly so.',
			'without a doubt.',
			'you may rely on it.',
			'as i see it, yes',
			'most likely.',
			'outlook good',
			'yes.',
			'signs point to yes.',
			'reply hazy try again.',
			'ask again later.',
			'better not tell you now.',
			'cannot predict now',
			'don\'t count on it.',
			'my reply is no.',
			'my sources say no.',
			'outlook not so good.',
			'very doubtful.'
		];
		msg.reply(`🎱  ${RESPONSES[Math.floor(Math.random() * RESPONSES.length)]}`);
	}
};
