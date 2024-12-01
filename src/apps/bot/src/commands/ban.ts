import { SlashCommandBuilder, GuildMember, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a member from the server.')
    .addUserOption((option) => option.setName('target').setDescription('The user to ban').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('Reason for the ban')),

  async execute(interaction) {
    const target = interaction.options.getMember('target') as GuildMember | null;
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!interaction.memberPermissions?.has(PermissionFlagsBits.BanMembers)) {
      await interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
      return;
    }

    if (!target) {
      await interaction.reply({ content: 'Member not found.', ephemeral: true });
      return;
    }

    await target.ban({ reason });
    await interaction.reply({ content: `🚨 ${target.user.tag} has been banned. Reason: ${reason}` });
  }
};
