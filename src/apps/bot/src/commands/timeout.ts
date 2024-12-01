import { SlashCommandBuilder, GuildMember, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Places a user in timeout.')
    .addUserOption((option) => option.setName('target').setDescription('The user to timeout').setRequired(true))
    .addIntegerOption((option) =>
      option.setName('duration').setDescription('Timeout duration in minutes').setRequired(true)
    )
    .addStringOption((option) => option.setName('reason').setDescription('Reason for the timeout')),

  async execute(interaction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ModerateMembers)) {
      await interaction.reply({ content: 'You do not have permission to timeout members.', ephemeral: true });
      return;
    }

    const target = interaction.options.getMember('target') as GuildMember | null;
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!target) {
      await interaction.reply({ content: 'The specified user was not found.', ephemeral: true });
      return;
    }

    const durationMs = duration * 60 * 1000;

    try {
      await target.timeout(durationMs, reason);
      await interaction.reply({
        content: `✅ ${target.user.tag} has been placed in timeout for ${duration} minute(s). Reason: ${reason}`
      });
    } catch (error) {
      console.error('Error timing out user:', error);
      await interaction.reply({ content: 'Failed to timeout the user. Please try again.', ephemeral: true });
    }
  }
};
