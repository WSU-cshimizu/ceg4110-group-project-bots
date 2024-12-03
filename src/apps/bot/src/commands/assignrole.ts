import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('assignrole')
    .setDescription('Assign a role to a user')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user to assign the role to').setRequired(true)
    )
    .addRoleOption((option) => option.setName('role').setDescription('The role to assign').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const member = await interaction.guild?.members.fetch(user.id);

    if (member.roles.cache.has(role.id)) {
      return interaction.reply({ content: `${user.tag} already has the ${role.name} role.`, ephemeral: true });
    }

    try {
      await member.roles.add(role);
      return interaction.reply({ content: `✅ Successfully assigned the ${role.name} role to ${user.tag}.` });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: '❌ There was an error assigning the role. Please try again later.',
        ephemeral: true
      });
    }
  }
};
