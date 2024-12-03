import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('Remove a role from a user')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user to remove the role from').setRequired(true)
    )
    .addRoleOption((option) => option.setName('role').setDescription('The role to remove').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const member = await interaction.guild.members.fetch(user.id);

    if (!member.roles.cache.has(role.id)) {
      return interaction.reply({ content: `${user.tag} does not have the ${role.name} role.`, ephemeral: true });
    }

    try {
      await member.roles.remove(role);
      return interaction.reply({ content: `✅ Successfully removed the ${role.name} role from ${user.tag}.` });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: '❌ There was an error removing the role. Please try again later.',
        ephemeral: true
      });
    }
  }
};
