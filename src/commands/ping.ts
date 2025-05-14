import { Message, Client, EmbedBuilder } from 'discord.js';
import { formatTime } from '../utils/formatTime.js'

export default {
  name: 'ping',
  async execute(message: Message, args: string[], client: Client) {
    // Preset
    const user = message.author;

    // Ping functions
    
    // -- Gateaway Ping 
    const gateaway_ping = client.ws.ping;
    // -- Api Ping
    const start = Date.now();
    await client.rest.get('/gateaway');
    const apiPing = Date.now() - start;
    // -- Uptime
    const uptime = formatTime(client.uptime || 0);
    

    // Finalização
    const embed = new EmbedBuilder()
    .setTitle('Latência')
    .setDescription(`
    >>> **Gateaway Ping:** \`[ ${gateaway_ping}ms ]\`
    **Api Ping:** \`[ ${apiPing}ms ]\`
    **Uptime:** \`[ ${uptime} ]\`
    `)
    .setFooter({ text: `${user.username}  |  ${user.id}`, iconURL: user.displayAvatarURL() })
    .setColor(0xff0000)
    await message.reply({ embeds: [embed] });
  }
}