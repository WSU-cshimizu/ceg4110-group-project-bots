import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Guild, GuildBasedChannel, GuildMember } from 'discord.js';
import { ClientApp } from '../types';

export default {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Send an announcement to the current channel')
    .addStringOption((option) =>
      option.setName('message').setDescription('The announcement message').setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        content: 'You do not have permission to send announcements!',
        ephemeral: true
      });
    }

    const announcementMessage = interaction.options.getString('message');

    const announcementEmbed = new EmbedBuilder()
      .setColor('#ffcc00')
      .setTitle('🚨 **Announcement** 🚨')
      .setDescription(announcementMessage)
      .setTimestamp()
      .setFooter({
        text: `Announcement from ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL()
      });

    try {
      await interaction.channel?.send({ embeds: [announcementEmbed] });
      await interaction.reply({
        content: 'Your announcement has been sent!',
        ephemeral: true
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'An error occurred while sending the announcement.',
        ephemeral: true
      });
    }
  },
  async apiExecute(client: ClientApp, { guildId, userId, channelId, message }) {
    let guild: Guild | null = null,
      channel: GuildBasedChannel | null = null,
      user: GuildMember | null = null;

    try {
      guild = await client.guilds.fetch(guildId)
      channel = await guild?.channels.fetch(channelId);
      user = await guild?.members.fetch(userId);

      const announcementEmbed = new EmbedBuilder()
        .setColor('#ffcc00')
        .setTitle('🚨 **Announcement** 🚨')
        .setDescription(message)
        .setTimestamp()
        .setFooter({
          text: `Announcement from ${user.user.tag}`,
          iconURL: user?.displayAvatarURL()
        });

      if (channel?.isSendable()) channel.send({ embeds: [announcementEmbed] });

    } catch (err) {
      if (!guild || !channel || !user) {
        throw new Error("Invalid GuildID, UserId, or ChannelId", {
          cause: 'invalid-input-id'
        });
      }
    }
  }
}
