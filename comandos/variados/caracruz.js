const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'caracruz',
    description: 'Ping!',
    aliases: ['cc'],
    execute(client, message, args, db) {
        let datos = args.join(" ").split(", ")
        let cara = datos[0]
        let cruz = datos[1]

        let posibles = [`**cara** (${cara})`, `**cruz** (${cruz})`];
        let resultado = posibles[Math.floor(Math.random() * posibles.length)];

        const embed = new MessageEmbed()
            .setColor('#a30584')
            .addFields(
                { name: 'Cara:', value: `${cara}`, inline: true },
                { name: 'Cruz:', value: `${cruz}`, inline: true },
            )
            .addField('Ganador:', `${resultado}`);

        message.channel.send(embed);
    },
};