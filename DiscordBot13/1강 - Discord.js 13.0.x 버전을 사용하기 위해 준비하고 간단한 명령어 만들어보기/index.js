// 유튜브 강의 : https://www.youtube.com/watch?v=iNcXi5LC-Jc
// 디스코드 서버 : https://discord.gg/bmceBj6nH9
// 디스코드 : ! MOON#9999 | ! ! MOON#9999 

const { Client, Intents, Collection } = require('discord.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]});
const { token } = require('./config.json')
const fs = require('fs')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));
client.commands = new Collection();
var data = []
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	data.push({name: command.name, description: command.description, options:command.options});
}

client.once('ready', async () => {
	console.log(`Logged In As ${client.user.tag}`)
	await client.guilds.cache.get('서버아이디')?.commands.set(data)
});

client.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;
	if(!client.commands.has(interaction.commandName)) return;
	const command = client.commands.get(interaction.commandName);
	try {
		await command.execute(interaction)
	}catch(error) {
		console.log(`오류가 발생했습니다. \n오류내용 : ${error}`)
	}
})

client.login(token)