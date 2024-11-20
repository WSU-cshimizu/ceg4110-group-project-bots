import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';

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
  }
};
