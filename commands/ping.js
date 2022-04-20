module.exports = {
    run: (client, interaction) => {
        interaction.reply({
            content: `Pong!\n:ping_pong: Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`,
            ephemeral: true,
        })
    }
}