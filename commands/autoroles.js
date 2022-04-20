const { stripIndents } = require("common-tags/lib")
const { MessageEmbed, Interaction } = require("discord.js")

module.exports = {

    async execute(client, interaction) {

        const channel = '895692333453041675'
        // Roles
        const gitHubFeeds = '895698040474714152'
        const syncCommands = '895693398709784658'
        const banknotesPlus = '895693166081081364'
        const economyPlus = '895693060921507850'

        // Emojis
        const economyPlusEmoji = '<:economyplus:870435606046580756>'
        const banknotesPlusEmoji = '<:banknotesplus:873938775779196979>'
        const synccommandsEmoji = '<:synccommands:922250439016190014>'
        const githubEmoji = '<:github:872223588592267294>'

        const staffId = "852720760568283136"
        if (!interaction.member.roles.cache.has(staffId)) {
            interaction.reply({
                content: `You must be a staff member to use this!`,
                ephemeral: true,
            })
        }

        await interaction.reply({
            content: "Done!",
            ephemeral: true,
        })

        let embed = new MessageEmbed()
            .setTitle("To get a role, react with the icon of the role that you want\n")
            .setDescription(stripIndents`${economyPlusEmoji} EconomyPlus
            
            ${banknotesPlusEmoji} BanknotesPlus
            
            ${synccommandsEmoji} SyncCommands

            ${githubEmoji} GitHub Feeds
            `)
    
        let messageEmbed = await interaction.channel.send({embeds: [embed]})
        await messageEmbed.react(economyPlusEmoji)
        await messageEmbed.react(banknotesPlusEmoji)
        await messageEmbed.react(synccommandsEmoji)
        await messageEmbed.react(githubEmoji)

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch() 
            if (user.bot) return

            if (reaction.message.channel.id == channel.id) {
                if (reaction.emoji == economyPlusEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(economyPlus)
                } else if (reaction.emoji == banknotesPlusEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(banknotesPlus)
                } else if (reaction.emoji == synccommandsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(syncCommands)
                } else if (reaction.emoji == githubEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(gitHubFeeds)
                }
            } else {
                return
            }
        })

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch() 
            if (user.bot) return

            if (reaction.message.channel.id == channel.id) {
                if (reaction.emoji == economyPlusEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(economyPlus)
                } else if (reaction.emoji == banknotesPlusEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(banknotesPlus)
                } else if (reaction.emoji == synccommandsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(syncCommands)
                } else if (reaction.emoji == githubEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(gitHubFeeds)
                }
            } else {
                return
            }
        })

    }
}