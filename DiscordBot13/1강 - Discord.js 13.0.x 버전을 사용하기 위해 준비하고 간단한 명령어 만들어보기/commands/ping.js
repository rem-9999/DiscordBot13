const { CommandInteraction } = require('discord.js')

module.exports = {
	name: "핑",
	description: '핑 테스트',
	/**
	 * @param { CommandInteraction } Interaction
	 */

	async execute(interaction) {
		await interaction.reply("퐁!")
	}
}