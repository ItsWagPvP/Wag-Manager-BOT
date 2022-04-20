require("dotenv").config()
const { Client, Intents, Interaction, MessageActionRow, MessageButton } = require("discord.js")
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
            interaction.reply({
                content: `Pong!\n:ping_pong: Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`,
                ephemeral: false,
            })
        } else if (commandName == 'verifygenerator') {

            /**
             *  @type {import("discord.js").GuildMember}
            */
            const member = interaction.member
            const staffId = "852720760568283136"
            if (!member.roles.cache.has(staffId)) {
                interaction.reply({
                    content: `You must be a staff member to use this!`,
                    ephemeral: true,
                })
            } else {

                let row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId("verifybutton")
                        .setLabel("Verify")
                        .setEmoji("966312438553255987")
                        .setStyle("SUCCESS")
                )

                interaction.channel.send({
                    content: "Verify yourself by clicking the following button",
                    components: [row]
                })

                interaction.reply({
                    content: `Done!`,
                    ephemeral: true,
                })

            }
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
