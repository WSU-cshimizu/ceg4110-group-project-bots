import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Embed } from 'discord.js';
import { ClientApp } from '../types';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction: CommandInteraction) {
        const color = interaction.client.ws.ping < 40 ? 'Green' : 'Red';
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Ping')
            .setDescription(`Ping: ${interaction.client.ws.ping}ms`);

        await interaction.reply({ embeds: [embed] });

        // Get the ping time
        // let pingTime = Math.round(Date.now() - interaction.createdTimestamp)


        // Update the embed then edit the message
        // embed.setColor(color).setDescription(`Ping: ${pingTime}ms`);
        // pingMsg.edit({ embeds: [embed] });
    },

    async apiExecute(client: ClientApp, { channelId, timestamp }: { channelId: string, timestamp: number }) {
        const channel = client.channels.cache.get(channelId);
        if (!channel) throw Error("Channel not found", {
            cause: 'channel-not-found'
        });

        const color = client.ws.ping < 40 ? 'Green' : 'Red';
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Ping')
            .setDescription(`Ping: ${client.ws.ping}ms`);

        if (!channel.isSendable()) throw Error("Channel is not sendable");
        await channel.send({ embeds: [embed] });
    }

};
