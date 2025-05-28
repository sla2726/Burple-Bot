import { Message, Client } from "discord.js";

const prefix = ".";

export default {
  name: "messageCreate",
  async execute(message: Message, client: Client) {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      await message.reply("**Ocorreu um erro ao executar este comando.**");
    }
  }
};