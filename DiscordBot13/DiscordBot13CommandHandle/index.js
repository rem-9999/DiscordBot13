const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const { token, prefix } = require('./config.json')
const fs = require('fs')

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log(`Logged In As ${client.user.tag}`)
});

client.on('messageCreate', async msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    try {
        await command.execute(msg, args)
    } catch (error) {
        console.log(`오류가 발생했습니다. \n오류내용 : ${error}`)
    }
})

client.login(token)