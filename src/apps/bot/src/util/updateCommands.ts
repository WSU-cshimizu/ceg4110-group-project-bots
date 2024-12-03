import 'dotenv/config';

import { REST, Routes } from 'discord.js';

import loadCommands from './loadCommands';

async function updateCommands() {
  try {
    const rest = new REST().setToken(<string>process.env.BOT_TOKEN);
    const CLIENT_ID = process.env.CLIENT_ID;
    const commandsArr = await loadCommands();

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(<string>CLIENT_ID), { body: commandsArr });
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error, 'Unexpected error during updating slash commands');
  }
}

await updateCommands();
