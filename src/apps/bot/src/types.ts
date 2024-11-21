import { SlashCommandBuilder, Client, Collection, Interaction } from 'discord.js';

export type CommandObject = {
  data: SlashCommandBuilder,
  execute: (...args: any | Interaction) => Promise<void>,
  apiExecute: (client: ClientApp, ...args: any) => Promise<void>
}

export interface ClientApp extends Client {
  commands?: Collection<string, CommandObject>;
}

export interface IAllCommand {
  name: string;
  description: string;
}


