module.exports = {
    run: (interaction) => {
        const roleId = "887008981212622918"
        const role = interaction.guild.roles.cache.get(roleId)
        const member = interaction.member
        member.roles.add(role)

        console.log(member.tag + " has been verified!")

        interaction.reply({
            content: "Verified!",
            ephemeral: true,
        })
    }
}