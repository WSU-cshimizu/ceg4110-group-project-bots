import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('serverinfo').setDescription('Displays information about the server'),

  async execute(interaction: CommandInteraction) {
    const guild = interaction.guild;

    if (!guild) {
      await interaction.reply({
        content: 'This command can only be used in a server.',
        ephemeral: true
      });
      return;
    }

    const owner = await guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setTitle('Server Information')
      .setThumbnail(guild.iconURL() || '')
      .setColor(0x00ae86)
      .addFields(
        { name: 'Server Name', value: guild.name, inline: true },
        { name: 'Owner', value: `<@${owner.id}> (${owner.user.tag})`, inline: true },
        { name: 'Total Members', value: `${guild.memberCount}`, inline: true },
        {
          name: 'Created On',
          value: `<t:${Math.floor(guild.createdAt.getTime() / 1000)}:F>`,
          inline: true
        }
      );

    await interaction.reply({ embeds: [embed] });
  }
};
