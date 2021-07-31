const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'caracruz',
    description: 'Tira una moneda y saca un resultado aleatorio, cara o cruz.',
    aliases: ['cc'],
    usage: '<cara>, <cruz>',
    execute(client, message, args, db) {
        let datos = args.join(" ").split(",")
        let cara = datos[0].trim()
        let cruz = datos[1].trim()

        if (!cara) return message.channel.send(`Especifica que es cara.`);
        if (!cruz) return message.channel.send(`Especifica que es cruz.`);

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