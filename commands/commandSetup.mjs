import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv'
dotenv.config();
const clientId = process.env["DISCORD_CLIENT_ID"]
const guildId = process.env["DISCORD_GUILD_ID"]
const token = process.env["BOT_TOKEN"]

const commandSetup = async () => {

    const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
        new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
        new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        new SlashCommandBuilder().setName('addition').setDescription("simple addition calculator")
            .addIntegerOption(option => option.setName('number_1').setDescription('Enter an integer'))
            .addIntegerOption(option => option.setName('number_2').setDescription('Enter a second integer'))
    ]
        .map(command => command.toJSON())
    const rest = new REST({ version: '9' }).setToken(process.env["BOT_TOKEN"]);
    console.log("still working");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
};

export default commandSetup;