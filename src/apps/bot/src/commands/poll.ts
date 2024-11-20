import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Creates a poll with multiple options')
    .addStringOption((option) => option.setName('question').setDescription('The poll question').setRequired(true))
    .addStringOption((option) =>
      option.setName('options').setDescription('Comma-separated list of options').setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        content: 'You do not have permission to create a poll.',
        ephemeral: true
      });
    }

    const question = interaction.options.getString('question');
    const options = interaction.options
      .getString('options')
      .split(',')
      .map((option) => option.trim());

    const embed = {
      title: question,
      description: options.map((opt, index) => `${index + 1}. ${opt}`).join('\n'),
      color: 0x0099ff
    };

    await interaction.reply({
      content: `@everyone ${interaction.user} has opened a poll. React to vote now!`,
      embeds: [embed]
    });
  }
};
