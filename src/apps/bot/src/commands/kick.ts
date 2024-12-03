import { SlashCommandBuilder, GuildMember, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member from the server.')
    .addUserOption((option) => option.setName('target').setDescription('The user to kick').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('Reason for the kick')),

  async execute(interaction) {
    const target = interaction.options.getMember('target') as GuildMember | null;
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!interaction.memberPermissions?.has(PermissionFlagsBits.KickMembers)) {
      await interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
      return;
    }

    if (!target) {
      await interaction.reply({ content: 'Member not found.', ephemeral: true });
      return;
    }

    await target.kick(reason);
    await interaction.reply({ content: `✅ ${target.user.tag} has been kicked. Reason: ${reason}` });
  }
};
