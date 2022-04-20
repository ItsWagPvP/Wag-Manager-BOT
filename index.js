require("dotenv").config()
const { Client, Intents, Interaction, MessageActionRow, MessageButton } = require("discord.js")
const ping = require("./commands/ping")
const autoroles = require("./commands/autoroles")
const verifygenerator = require("./commands/verifygenerator")
const verifybutton = require("./events/verifybutton")
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a | b), partials: ['REACTION', 'MESSAGE'] })

let prefix = "."

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag)

    const guildId = "850369119568134206"
    const guild = client.guilds.cache.get(guildId)

    let commands = guild.commands

    commands.create({
        name: 'ping',
        description: 'Retrieves the bot latency',
    })

    commands.create({
        name: 'verifygenerator',
        description: 'Send the verifier message',
    })

    commands.create({
        name: 'reactionrole',
        description: 'Send the autoroles message',
    })

})

client.on("interactionCreate", async (interaction) => {

    if (interaction.isCommand()) {
        const { commandName, options } = interaction
        if (commandName == "ping") ping.run(client, interaction)
        else if (commandName == "verifygenerator") verifygenerator.run(interaction)
        else if (commandName == "reactionrole") await autoroles.execute(client, interaction)


    } else if (interaction.isButton()) {
        switch (interaction.customId) {
            case "verifybutton": verifybutton.run(interaction)
        }
    }

    //TODO assign command with notify

})

client.login(process.env.TOKEN)
