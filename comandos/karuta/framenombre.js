const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'framenombre',
    description: 'Busca un frame por el nombre.',
    aliases: ['framename', 'fn'],
    cooldown: 5,
    usage: '<Nombre del frame>',
    async execute(client, message, args, kfdb, acciondb) {

        let categories = [];
        let colorframe = [];
        let imagen = [];
        let datos = args.join(" ").split(", ");

        if (!datos[0]) return message.channel.send('Faltan argumentos. Usa *`help framenombre`* para ver como usarlos.');

        let nombrein = datos[0].trim().toLowerCase();

        const filas = await kfdb.find({ nombre: `${nombrein}` }).exec().catch((err) => {
            return console.log(err);
          });
        
          if (filas == null || !filas[0]) return message.channel.send('No se han encontrado datos para ese frame.');

            filas.forEach((doc) => {
                const name = doc.nombre;
                const bi1 = doc.bit1;
                const bi2 = doc.bit2;
                const pic = doc.foto;
                const paint = doc.color;

                let data = new Object();

                data = {
                    name: name,
                    value: `2,500 ${bi1} bits y 2,500 ${bi2} bits`,
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
                .setTitle(`Frame con el nombre ${nombrein}`)
                .addFields(categories)
                .setColor(`${colorframe}`)
                .setImage(`${imagen}`);
            return message.channel.send(embed);
    },
};