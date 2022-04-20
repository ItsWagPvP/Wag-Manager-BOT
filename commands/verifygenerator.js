let {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
    run: (interaction) => {
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
}