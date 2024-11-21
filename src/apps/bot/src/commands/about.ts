import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('about').setDescription('Displays information about the bot'),

  async execute(interaction: CommandInteraction) {
    const bot = interaction.client.user;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('About This Bot')
      .setDescription('This bot was created to help you with various tasks on Discord!')
      .addFields(
        { name: 'Bot Name', value: bot?.username || 'Unknown', inline: true },
        { name: 'Bot ID', value: bot?.id || 'Unknown', inline: true },
        { name: 'Servers', value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: 'Created On', value: bot?.createdAt.toDateString() || 'Unknown', inline: true },
        { name: 'Prefix', value: 'Use Slash commands (/) to interact with the bot!', inline: false }
      )
      .setThumbnail(bot?.displayAvatarURL() || '')
      .setFooter({ text: `Bot powered by ${bot?.username}`, iconURL: bot?.displayAvatarURL() || '' });

    await interaction.reply({ embeds: [embed] });
  }
};
