import { EmbedBuilder, User } from 'discord.js';
import { randomPurpleColor } from '../utils/randomPurpleColor.js';

export function defaultEmbed(title: string, description: string, user: User): EmbedBuilder {
  
  return new EmbedBuilder()
  .setTitle(title)
  .setDescription(description)
  .setFooter({ text: `${user.username}  |  ${user.id}`, iconURL: user.displayAvatarURL() })
  .setColor(randomPurpleColor())
  .setTimestamp()
  .setThumbnail(user.displayAvatarURL())
}