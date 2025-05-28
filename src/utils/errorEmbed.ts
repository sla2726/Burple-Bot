import { EmbedBuilder, User } from 'discord.js'
export function errorEmbed(description: string, user: User): EmbedBuilder {
  
  return new EmbedBuilder()
  .setTitle('❌️  |  Falha!')
  .setDescription(description)
  .setFooter({ text: `${user.username}  |  ${user.id}`, iconURL: user.displayAvatarURL() })
  .setColor(0xff0000)
  .setTimestamp()
  .setThumbnail(user.displayAvatarURL())
}