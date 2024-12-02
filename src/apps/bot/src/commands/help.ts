import { SlashCommandBuilder } from 'discord.js';

import { IAllCommand } from '../types';

const commandsList: IAllCommand[] = [
  {
    name: 'about',
    description: 'Displays information about the bot'
  },
  {
    name: 'announce',
    description: 'Send an announcement to the channel'
  },
  {
    name: 'head-tails',
    description: 'Flip a coin for a head or tails result'
  },
  {
    name: 'poll',
    description: 'Creates a poll with multiple options'
  },
  {
    name: 'ping',
    description: "Check the bot's latency"
  },
  {
    name: 'server-info',
    description: 'Displays information about the server'
  }
];

export default {
  data: new SlashCommandBuilder().setName('help').setDescription('List all available bot commands'),

  async execute(interaction) {
    const embed = {
      title: 'Bot Commands',
      description: commandsList.map((command) => `**/${command.name}** - ${command.description}\n`).join(''),
      color: 0x0099ff
    };

    await interaction.reply({
      content: 'Here are the available commands:',
      embeds: [embed]
    });
  }
};
