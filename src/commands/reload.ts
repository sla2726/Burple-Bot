import { Message, Client, EmbedBuilder } from 'discord.js';
import { defaultEmbed } from '../utils/defaultEmbed';
import { errorEmbed } from '../utils/errorEmbed';
import * as path from 'path';
import * as fs from 'fs';

export default {
  name: 'reload',
  async execute(message: Message, args: string[], client: Client) {
    // Preset
    const user = message.author
    
    const commandName = args[0];

    // Verificação 01 - Sem argumentos
    if (!commandName) {
      const fail_embed = errorEmbed('**Digite o nome do comando!**', user)
      return message.reply({ embeds: [fail_embed] })
    }

    // Configs do comando
    const commandPath = path.join(__dirname, `../commands`);

    const jsPath = path.join(commandPath, `${commandName}.js`)
    const tsPath = path.join(commandPath, `${commandName}.ts`)

    let filePath = fs.existsSync(tsPath) ? tsPath : jsPath;
    
    // Verificação 02 - Comando inexistente
    if (!fs.existsSync(filePath)) {
      const fail_embed = errorEmbed(`**O comando \`[ ${commandName} ]\` não existe!**`, user)
      return message.reply({ embeds: [fail_embed] })
    }

    try {
      const modulePath = path.resolve(filePath);
      delete require.cache[require.resolve(modulePath)]

      const newCommand = await import(modulePath);
      client.commands.set(newCommand.default.name, newCommand.default);

      const success_embed = defaultEmbed('Recarregamento!', '**Comando recarregado com sucesso!**', user)
      await message.reply({ embeds: [success_embed] })
    } catch(err) {
      console.log(err)
      const fail_embed = errorEmbed(`**Erro ao recarregar o comando \`[ ${commandName} ]\`!**`, user)
      await message.reply({ embeds: [fail_embed] })
    }
    
  }
}