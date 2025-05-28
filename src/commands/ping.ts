import { Message, Client, EmbedBuilder } from 'discord.js';
import { formatTime } from '../utils/formatTime';
import { defaultEmbed } from '../utils/defaultEmbed'

export default {
  name: 'ping',
  async execute(message: Message, args: string[], client: Client) {
    // Preset
    const user = message.author;

    // Ping functions
    
    // -- Gateaway Ping 
    const gateway_ping = client.ws.ping;
    // -- Api Ping
    const start = Date.now();
    await client.rest.get('/gateway');
    const apiPing = Date.now() - start;
    // -- Uptime
    const uptime = formatTime(client.uptime || 0);

    
    // Finalização
    const description = [
      `>>> **Gateway Ping: \`[ ${gateway_ping}ms ]\``,
      `Api Ping: \`[ ${apiPing}ms ]\``,
      `Uptime: \`[ ${uptime} ]\`**`
    ].join('\n')
    
    const success_embed = defaultEmbed(
      'Latência',
      description,
      user
    )
    await message.reply({ embeds: [success_embed] });
  }
}