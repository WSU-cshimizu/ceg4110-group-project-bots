import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { ClientApp } from '../types';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!');
    },

    async apiExecute(client: ClientApp, { channelId, message }: { channelId: string, message: string }) {
        const channel = client.channels.cache.get(channelId);
        if (!channel) throw Error("Channel not found", {
            cause: 'channel-not-found'
        });

        if (channel?.isTextBased() && channel.isSendable())
            channel.send(message);
    }

};
