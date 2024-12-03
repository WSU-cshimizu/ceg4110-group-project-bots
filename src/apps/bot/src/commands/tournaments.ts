import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const PANDASCORE_API_KEY = process.env.PANDASCORE_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
};

export default {
  data: new SlashCommandBuilder()
    .setName('tournaments')
    .setDescription('Get upcoming tournaments for a specific esports game')
    .addStringOption((option) =>
      option
        .setName('game')
        .setDescription('Select the game')
        .setRequired(true)
        .addChoices(
          { name: 'CS:GO', value: 'cs-go' },
          { name: 'Dota 2', value: 'dota-2' },
          { name: 'League of Legends', value: 'league-of-legends' },
          { name: 'Valorant', value: 'valorant' }
        )
    ),

  async execute(interaction) {
    const game = interaction.options.getString('game');

    try {
      const url = `https://api.pandascore.co/videogames/${game}/tournaments?page=1&per_page=5&token=${PANDASCORE_API_KEY}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const tournaments = await response.json();

      if (tournaments.length === 0) {
        await interaction.reply({ content: `No upcoming tournaments found for **${game}**.`, ephemeral: true });
        return;
      }

      const tournamentEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`🏆 **Upcoming Tournaments for ${game.toUpperCase()}**`)
        .setDescription(`Here are the top upcoming tournaments for **${game}**`)
        .setFooter({ text: 'Data powered by PandaScore' })
        .setTimestamp();

      tournaments.forEach((tournament) => {
        const startDate = new Date(tournament.begin_at).toLocaleDateString();
        const endDate = new Date(tournament.end_at).toLocaleDateString();
        const location = tournament.location || 'Online';
        const prizePool = tournament.prize_pool ? `$${tournament.prize_pool.toLocaleString()}` : 'N/A';

        tournamentEmbed.addFields({
          name: `${tournament.name}`,
          value: `**Start Date:** ${startDate}\n**End Date:** ${endDate}\n**Location:** ${location}\n**Prize Pool:** ${prizePool}`,
          inline: false
        });
      });

      await interaction.reply({ embeds: [tournamentEmbed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Failed to fetch tournament data. Please try again later.', ephemeral: true });
    }
  }
};
