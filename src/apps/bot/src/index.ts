/**
 * General Purpose Discord Bot
 *
 * Authors:
 *  - Ishan
 *  - Josh
 *  - Gani
 *  - Jared
 */

import 'dotenv/config';
import { Events, GatewayIntentBits, Client, Partials } from 'discord.js';
import { ClientApp } from './types';
import loadCommands from './util/loadCommands';
import { createServer } from './api';

const DISCORD_TOKEN = process.env.BOT_TOKEN;
const SERVER_PORT = process.env.PORT || 5175;


const client: ClientApp = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ],
    partials: [
        Partials.Channel, Partials.Message
    ]
})
const app = createServer(client);


await loadCommands(client);

client.once(Events.ClientReady, async (ready) => {
  console.log(`Successfully logged in as ${ready.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const name = interaction.commandName;
    const cli: ClientApp = interaction.client;
    const command = cli.commands?.get(name);

    if (!command) await interaction.reply(`No command named ${name}`);

    try {
      await command?.execute(interaction);
    } catch (err) {
      console.error(err, 'Unexpected error on member join!');
    }
  }
});

client.login(DISCORD_TOKEN);

app.listen(SERVER_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${SERVER_PORT}`);
});
