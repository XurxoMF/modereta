const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'framenombre',
    description: 'Busca un frame por el nombre.',
    cooldown: 5,
    usage: '<Nombre del frame>',
    execute(client, message, args) {
        message.delete();

        let categories = [];
        let colorframe = [];
        let imagen = [];
        let datos = args.join(" ").split(", ")
        let nombrein = datos[0].toLowerCase()

        if (!datos[0]) return message.channel.send(`Escriba el nombre del frame.`);

        const resultado = client.framesDB.buscar({ nombre: nombrein });

        if (!resultado || !resultado[0]) return message.channel.send(`No hay frames con ese nombre.`);

        resultado.forEach((doc) => {
            const name = doc.nombre;
            const bi1 = doc.bit1;
            const bi2 = doc.bit2;
            const pic = doc.foto;
            const paint = doc.color;

            let data = new Object();

            data = {
                name: name,
                value: `2,500 ${bi1} bits | 2,500 ${bi2} bits`,
            };

            let col = new Object();

            col = paint;

            let picture = new Object();

            picture = pic;

            categories.push(data);
            colorframe.push(col);
            imagen.push(picture);
        });

        const embed = new MessageEmbed()
            .setTitle(`Frames con el nombre ${nombrein}:`)
            .addFields(categories)
            .setColor(`${colorframe}`)
            .setImage(`${imagen}`);
        return message.channel.send(embed);
    },
};