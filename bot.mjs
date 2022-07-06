import express from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const token = process.env['BOT_TOKEN'];

import { Client, Intents } from 'discord.js';
import commandSetup from "./commands/commandSetup.mjs"

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: { parse: ["users", "roles"] }
});
await commandSetup();

let isBotLogged = false;

bot.on('ready', async () => {
    isBotLogged = true;
    console.log('🕐 I am online!!')
    bot.user.setActivity('Goat Simulator', {type: ('COMPETING')})
    bot.user.setPresence({
        status: 'Online'
    })
})

bot.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    switch (commandName) {
        case "ping" :
            await interaction.reply('Pong!');
            break;
        case "server" :
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
            break;
        case "user" :
            await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
            break;
        case "addition" :
            const numberOne = interaction.options.getInteger('number_1');
            const numberTwo = interaction.options.getInteger('number_2');
            await interaction.reply(`**Number 1 :** ${numberOne}\n**Number 2 :** ${numberTwo}\n\nYour total: ${numberOne + numberTwo}`);
            break;
    }
})
bot.login(token);

app.get('/', async (req, res) => {
    if(isBotLogged) {
        return res.send(`Logged in as ${bot.user.tag}!`);
    }
})

app.get('/test', async (req, res) => {
    if(isBotLogged) {
        const channel = bot.channels.cache.get(process.env['DISCORD_CHANNEL_ID']);
        const role = process.env['DISCORD_ROLE_ID'];

        let message = `Hey <@&${role}> !`;
        channel.send(message);
        return res.status(200).send('{ "success" : "Message has been triggered" }');
    }
    return res.status(403).send('{ "error" : "Bot is not online" }');
})
app.listen(process.env['PORT']);