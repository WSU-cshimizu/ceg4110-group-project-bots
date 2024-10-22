import { SlashCommandBuilder, Client, Collection } from "discord.js"

export type CommandObject = {
    data: SlashCommandBuilder,
    execute: (...args: any) => Promise<void>;
}

export interface ClientApp extends Client {
    commands?: Collection<string, CommandObject>
}