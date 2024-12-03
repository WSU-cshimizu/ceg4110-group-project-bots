import { SlashCommandBuilder } from 'discord.js';

import { IAllCommand } from '../types';

const commandsList: IAllCommand[] = [
  {
    name: 'about',
    description: 'Displays information about the bot'
  },
  {
    name: 'help',
    description: 'Displays all available commands'
  },
  {
    name: 'serverinfo',
    description: 'Displays information about the server'
  },
  {
    name: 'ping',
    description: "Check the bot's latency"
  },
  {
    name: 'ban',
    description: 'Ban a member from the server'
  },
  {
    name: 'kick',
    description: 'Kicks a member from the server'
  },
  {
    name: 'assignrole',
    description: 'Assigns a role to a member in the server'
  },
  {
    name: 'removerole',
    description: 'Removes a role from a member in the server'
  },
  {
    name: 'timeout',
    description: 'Timeouts a member from the server'
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
    name: 'announce',
    description: 'Send an announcement to the channel'
  },
  {
    name: 'pet',
    description: 'Manage your pet with commands like feed, play, and status'
  },
  {
    name: 'news',
    description: 'Displays the latest news for a specific game'
  },
  {
    name: 'tournaments',
    description: 'Displays upcoming tournaments for a specific esports game'
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
