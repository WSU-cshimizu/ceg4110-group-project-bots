import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

import 'dotenv/config';

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
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(gameName)}&sortBy=publishedAt&language=en&apiKey=${apiKey}`
      );

      const data = await response.json();

      const articles = data.articles.slice(0, 5);

      if (articles.length === 0) {
        await interaction.reply({
          content: `No news found for the game: ${gameName}.`,
          ephemeral: true
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Latest News about ${gameName}`)
        .setColor('#0099ff')
        .setFooter({ text: 'Data powered by NewsAPI' });

      articles.forEach((article) => {
        embed.addFields({
          name: article.title,
          value: `[Read More](${article.url})`
        });
      });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching news:', error);
      await interaction.reply({
        content: 'Failed to fetch news. Please try again later.',
        ephemeral: true
      });
    }
  }
};
