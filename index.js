require("dotenv").config()
const { Client, Intents, Interaction, MessageActionRow, MessageButton } = require("discord.js")
const ping = require("./commands/ping")
const verifygenerator = require("./commands/verifygenerator")
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

})

client.on("interactionCreate", async (interaction) => {

    if (interaction.isCommand()) {
        const { commandName, options } = interaction

        if (commandName == 'ping') {
            ping.run(client, interaction)
        } else if (commandName == 'verifygenerator') {
            verifygenerator.run(interaction)
        }

    } else if (interaction.isButton()) {
        switch (interaction.customId) {
            case "verifybutton": {
                const roleId = "887008981212622918"
                const role = interaction.guild.roles.cache.get(roleId)

                const member = interaction.member

                member.roles.add(role)

                interaction.reply({
                    content: "Verified!",
                    ephemeral: true,
                })

                break
            }
        }
    }


    //TODO assign command with notify
})

client.login(process.env.TOKEN)
