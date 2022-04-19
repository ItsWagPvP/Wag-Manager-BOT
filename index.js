const {Client, Intents} = require("discord.js")
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a | b), partials: ['REACTION', 'MESSAGE'] })

client.on("ready", () => {
    console.log("sono un assassino meridionale")
})

client.on("message", (message) => {
    console.log(message.author.tag)
})

client.login("OTY1OTgwMTg4ODE3MTE3MTg1.Yl7FKA.xWrL3X9a7nSMi6jUxJZqqsVgWOY")
