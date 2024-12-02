import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { Collection, Client, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { ClientApp, CommandObject } from '../types';

/**
 * Loads all the commands putting it into the client
 *
 * @param { Client } client
 * @returns { Promise< import('../typedefs.js').Command[] > }
 */
const loadCommands = async (client?: ClientApp) => {
  let commands: Collection<string, CommandObject> = new Collection();

  if (client) {
    client.commands = new Collection();
    commands = client.commands;
  }

  const commandsArr: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  const files = await readdir(join(process.cwd(), 'dist', 'commands'));

  for (const file of files) {
    const loc = join(process.cwd(), 'dist', 'commands', file);
    const check = await stat(loc);

    if (check.isDirectory()) continue;

    const command: CommandObject = (await import(loc)).default;

    if (command && 'data' in command && 'execute' in command) {
      if (client) commands.set(command.data.name, command);
      commandsArr.push(command.data.toJSON());
    }
  }

  return commandsArr;
};

export default loadCommands;
