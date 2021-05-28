const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'framebit',
    description: 'Busca un frame por el tipo de bit que usa.',
    cooldown: 5,
    usage: '<Tipo de bit>',
    execute(client, message, args) {
        message.delete();

        let categories = [];
        let datos = args.join(" ").split(", ")
        let bitsin = datos[0].toLowerCase()

        if (!datos[0]) return message.channel.send(`Escriba el tipo de bit que use el frame.`);

        const bits1 = client.framesDB.buscar({ bit1: bitsin });
        const bits2 = client.framesDB.buscar({ bit2: bitsin });

        const resultado = [...bits1, ...bits2];

        if(!resultado || !resultado[0]) return message.channel.send(`No hay frames que usen ese tipo de bit. Comprueba que el nombre del bit esté bien escrito.`);

        resultado.forEach((doc) => {
            const name = doc.nombre;
            const bi1 = doc.bit1;
            const bi2 = doc.bit2;

            let data = new Object();

            data = {
                name: name,
                value: `2,500 ${bi1} bits | 2,500 ${bi2} bits`,
            };

            categories.push(data);
        });
        const embed = new MessageEmbed()
            .setTitle(`Frames que usen ${bitsin}:`)
            .addFields(categories)
            .setColor(`#84e3ca`);
        return message.channel.send(embed);
    },
};