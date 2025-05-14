import { Client, GatewayIntentBits, Collection } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, any>
  }
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();


// Carregando comandos
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

async function startBot() {
  for (const file of commandsFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.default.name, command.default)
  }
  client.once('ready', () => {
    console.log('Estou online chefia');
  });
}

// Carregando eventos
const eventsPath = path.join(__dirname, 'events')
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

async function startEvents() {
  for (const event of eventsFiles) {
    const eventModule = await import(`./events/${event}`);
    if (eventModule.default.name && eventModule.default.execute) {
      client.on(eventModule.default.name, (...args) => eventModule.default.execute(...args, client));
    }
  }
}

startBot(); 
startEvents();
client.login(process.env.TOKEN);