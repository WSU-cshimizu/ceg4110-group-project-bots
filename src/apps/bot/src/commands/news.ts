import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const apiKey = process.env.NEWS_API_KEY;

export default {
  data: new SlashCommandBuilder()
    .setName('news')
    .setDescription('Get the latest news about a specific game')
    .addStringOption((option) =>
      option
        .setName('game')
        .setDescription('Enter the name of the game (e.g., Valorant, CS:GO, Dota2)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const gameName = interaction.options.getString('game');

    try {
      await interaction.deferReply();

      const response = await fetch(
        `https://serpapi.com/search.json?engine=google_news&q=${encodeURIComponent(gameName)}&gl=us&hl=en&api_key=${apiKey}`
      );

      const data = await response.json();

      const articles = data.news_results;

      if (!articles || articles.length === 0) {
        await interaction.editReply({
          content: `No news found for the game: ${gameName}.`
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Latest News about ${gameName}`)
        .setColor('#0099ff')
        .setFooter({ text: 'Data powered by SerpAPI' });

      articles.slice(0, 5).forEach((article) => {
        embed.addFields({
          name: article.title,
          value: `[Read More](${article.link})`
        });
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching news:', error);
      await interaction.editReply({
        content: 'Failed to fetch news. Please try again later.'
      });
    }
  }
};
