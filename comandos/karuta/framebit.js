const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'framebit',
    description: 'Busca un frame por el tipo de bits que usa.',
    aliases: ['fb'],
    cooldown: 5,
    usage: '<Tipo de bit> [Segundo tipo de bit]',
    execute(client, message, args, db) {
        message.delete();

        let categories = [];
        let img = [];
        let datos = args.join(" ").split(", ")
        let bitsin1 = datos[0].toLowerCase()

        if (!datos[0]) return message.channel.send('Faltan argumentos. Usa *`help framebit`* para ver como usarlos.').then((msg) => {
            msg.delete({ timeout: 5000 })
        });

        if (!datos[1]) {

            db.all(`SELECT * FROM karutaframes WHERE bit1 = ? OR bit2 = ?`, [bitsin1, bitsin1], (err, filas) => {
                if (err) return console.error(err.message)
                if (!filas || !filas[0]) return message.channel.send('No hay frames que usen ese tipo de bit.').then((msg) => {
                    msg.delete({ timeout: 5000 })
                })

                filas.forEach((doc) => {
                    const name = doc.nombre;
                    const bi1 = doc.bit1;
                    const bi2 = doc.bit2;
                    const imagen = doc.foto;

                    let data = new Object();
                    let imgdata = new Object();

                    data = {
                        name: name,
                        value: `2,500 ${bi1} bits | 2,500 ${bi2} bits`,
                    };

                    imgdata = imagen;

                    categories.push(data);
                    img.push(imgdata);
                });

                const embed = new MessageEmbed()
                    .setTitle(`Frames que usen ${bitsin1} bits:`)
                    .addFields(categories)
                    .setColor(`#84e3ca`);

                return message.channel.send(embed).then(msg => {
                    msg.react('⏪').then(r => {
                        msg.react('⏩');
                        const isBackwards = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
                        const isForwards = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

                        const backwards = msg.createReactionCollector(isBackwards, {idle: (3 * 60) * 1000});
                        const forwards = msg.createReactionCollector(isForwards, {idle: (3 * 60) * 1000});

                        let frame = 0;

                        backwards.on("collect", r => {
                            if (frame == 0) return;
                            if (frame == 1) {
                                frame--;
                                const embedprincipal = new MessageEmbed()
                                    .setTitle(`Frames que usen ${bitsin1} bits:`)
                                    .addFields(categories)
                                    .setColor(`#84e3ca`);

                                msg.edit(embedprincipal)

                            } else {

                                frame--;
                                const embedback = new MessageEmbed()
                                    .setColor(`#84e3ca`)
                                    .addFields(categories[frame - 1])
                                    .setImage(img[frame - 1])
                                    .setFooter(`Frame ${frame} de ${filas.length}`)
                                msg.edit(embedback)
                            }
                        });


                        forwards.on("collect", r => {
                            if (frame == filas.length) return;
                            frame++;
                            const embedforward = new MessageEmbed()
                                .setColor(`#84e3ca`)
                                .addFields(categories[frame - 1])
                                .setImage(img[frame - 1])
                                .setFooter(`Frame ${frame} de ${filas.length}`)

                            msg.edit(embedforward)
                        });
                    });
                });
            })

        } else {

            let bitsin2 = datos[1].toLowerCase()

            db.all(`SELECT * FROM karutaframes WHERE ((bit1 = ? OR bit1 = ?) AND (bit2 = ? OR bit2 = ?))`, [bitsin1, bitsin2, bitsin1, bitsin2], (err, filas) => {
                if (err) return console.error(err.message)
                if (!filas || !filas[0]) return message.channel.send('No hay frames que usen esos dos bits juntos.').then((msg) => {
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
                    .setTitle(`Frames que usen ${bitsin1} bits y ${bitsin2} bits:`)
                    .addFields(categories)
                    .setColor(`#84e3ca`);
                return message.channel.send(embed);
            })
        }
    },
};