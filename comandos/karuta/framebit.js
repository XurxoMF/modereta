const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'framebit',
    description: 'Busca un frame por el tipo de bit que usa.',
    cooldown: 5,
    usage: '<Tipo de bit>',
    execute(client, message, args, db) {
        message.delete();

        let categories = [];
        let datos = args.join(" ").split(", ")
        let bitsin = datos[0].toLowerCase()

        if (!datos[0]) return message.channel.send('Faltan argumentos. USa *`help framebit`* para ver como usarlos.').then((msg) =>{
            msg.delete({ timeout: 5000 })
        });

        db.all(`SELECT * FROM karutaframes WHERE bit1 = ? OR bit2 = ?`, [bitsin, bitsin], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas || !filas[0]) return message.channel.send('No hay frames que usen ese tipo de bit.').then((msg) =>{
                msg.delete({ timeout: 5000 })
            })
            
            filas.forEach((doc) => {
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
                .setTitle(`Frames que usen ${bitsin} bits:`)
                .addFields(categories)
                .setColor(`#84e3ca`);
            return message.channel.send(embed);
        })
    },
};