import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

const client = new Client({ intents: [GatewayIntentBits.Guilds ] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandsFiles) {
  const command = await import('./commands/${file}');
  client.commands.set(command.default.name, command.default)
}

client.once('ready', () => {
  console.log('Estou online chefia');
});

client.login(process.env.TOKEN)