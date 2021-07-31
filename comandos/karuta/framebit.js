const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: 'framebit',
    description: 'Busca un frame por el tipo de bits que usa.',
    aliases: ['fb'],
    cooldown: 5,
    usage: '<Tipo de bit> [Segundo tipo de bit]',
    async execute(client, message, args, db) {

        let categories = [];
        let img = [];
        let datos = args.join(" ").split(", ")
        let bitsin1 = datos[0].trim().toLowerCase()

        if (!datos[0]) return message.channel.send('Faltan argumentos. Usa *`help framebit`* para ver como usarlos.').then((msg) => {
            msg.delete({ timeout: 5000 })
        });

        if (!datos[1]) {

            db.all(`SELECT * FROM karutaframes WHERE bit1 = ? OR bit2 = ?`, [bitsin1, bitsin1], async (err, filas) => {
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

                let backwardsbuttonon = new MessageButton().setStyle("blurple").setID("backbuton").setLabel("◀️")
                let backwardsbuttonoff = new MessageButton().setStyle("blurple").setID("backbutoff").setLabel("◀️").setDisabled()
                let forwardsbuttonon = new MessageButton().setStyle("blurple").setID("forwbuton").setLabel("▶️")
                let forwardsbuttonoff = new MessageButton().setStyle("blurple").setID("forwbutoff").setLabel("▶️").setDisabled()
                let listabuttonon = new MessageButton().setStyle("blurple").setID("listabuton").setLabel("📋")
                let listabuttonoff = new MessageButton().setStyle("blurple").setID("listabutoff").setLabel("📋").setDisabled()

                return await message.channel.send(embed, { buttons: [backwardsbuttonoff, listabuttonoff, forwardsbuttonon] }).then(msg => {

                    const collector = msg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 60000 });

                    let frame = 0;

                    collector.on("collect", (b) => {
                        b.reply.defer();

                        if (b.id == "forwbuton") {
                            if (frame == filas.length - 1) {

                                frame++;
                                const embedforward = new MessageEmbed()
                                    .setColor(`#84e3ca`)
                                    .addFields(categories[frame - 1])
                                    .setImage(img[frame - 1])
                                    .setFooter(`Frame ${frame} de ${filas.length}`)

                                msg.edit(embedforward, { buttons: [backwardsbuttonon, listabuttonon, forwardsbuttonoff] })

                            } else {

                                frame++;
                                const embedforward = new MessageEmbed()
                                    .setColor(`#84e3ca`)
                                    .addFields(categories[frame - 1])
                                    .setImage(img[frame - 1])
                                    .setFooter(`Frame ${frame} de ${filas.length}`)

                                msg.edit(embedforward, { buttons: [backwardsbuttonon, listabuttonon, forwardsbuttonon] })
                            }

                        } else {

                            if (b.id == "backbuton") {

                                if (frame == 1) {

                                    frame--;
                                    const embedprincipal = new MessageEmbed()
                                        .setTitle(`Frames que usen ${bitsin1} bits:`)
                                        .addFields(categories)
                                        .setColor(`#84e3ca`);

                                    msg.edit(embedprincipal, { buttons: [backwardsbuttonoff, listabuttonoff, forwardsbuttonon] })

                                } else {

                                    frame--;
                                    const embedback = new MessageEmbed()
                                        .setColor(`#84e3ca`)
                                        .addFields(categories[frame - 1])
                                        .setImage(img[frame - 1])
                                        .setFooter(`Frame ${frame} de ${filas.length}`)
                                    msg.edit(embedback, { buttons: [backwardsbuttonon, listabuttonon, forwardsbuttonon] })

                                }
                            } else {

                                if (b.id == "listabuton") {

                                    frame = 0;
                                    const embed = new MessageEmbed()
                                        .setTitle(`Frames que usen ${bitsin1} bits:`)
                                        .addFields(categories)
                                        .setColor(`#84e3ca`);
                                    msg.edit(embed, { buttons: [backwardsbuttonoff, listabuttonoff, forwardsbuttonon] })

                                }

                            }
                        }
                    })
                });
            })

        } else {

            let bitsin2 = datos[1].trim().toLowerCase()

            db.all(`SELECT * FROM karutaframes WHERE ((bit1 = ? OR bit1 = ?) AND (bit2 = ? OR bit2 = ?))`, [bitsin1, bitsin2, bitsin1, bitsin2], async (err, filas) => {
                if (err) return console.error(err.message)
                if (!filas || !filas[0]) return message.channel.send('No hay frames que usen esos dos bits juntos.').then((msg) => {
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
                    .setTitle(`Frames que usen ${bitsin1} bits y ${bitsin2} bits:`)
                    .addFields(categories)
                    .setColor(`#84e3ca`);

                let backwardsbuttonon = new MessageButton().setStyle("blurple").setID("backbuton").setLabel("◀️")
                let backwardsbuttonoff = new MessageButton().setStyle("blurple").setID("backbutoff").setLabel("◀️").setDisabled()
                let forwardsbuttonon = new MessageButton().setStyle("blurple").setID("forwbuton").setLabel("▶️")
                let forwardsbuttonoff = new MessageButton().setStyle("blurple").setID("forwbutoff").setLabel("▶️").setDisabled()
                let listabuttonon = new MessageButton().setStyle("blurple").setID("listabuton").setLabel("📋")
                let listabuttonoff = new MessageButton().setStyle("blurple").setID("listabutoff").setLabel("📋").setDisabled()

                return await message.channel.send(embed, { buttons: [backwardsbuttonoff, listabuttonoff, forwardsbuttonon] }).then(msg => {

                    const collector = msg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 60000 });

                    let frame = 0;

                    collector.on("collect", (b) => {
                        b.reply.defer();

                        if (b.id == "forwbuton") {
                            if (frame == filas.length - 1) {

                                frame++;
                                const embedforward = new MessageEmbed()
                                    .setColor(`#84e3ca`)
                                    .addFields(categories[frame - 1])
                                    .setImage(img[frame - 1])
                                    .setFooter(`Frame ${frame} de ${filas.length}`)

                                msg.edit(embedforward, { buttons: [backwardsbuttonon, listabuttonon, forwardsbuttonoff] })

                            } else {

                                frame++;
                                const embedforward = new MessageEmbed()
                                    .setColor(`#84e3ca`)
                                    .addFields(categories[frame - 1])
                                    .setImage(img[frame - 1])
                                    .setFooter(`Frame ${frame} de ${filas.length}`)

                                msg.edit(embedforward, { buttons: [backwardsbuttonon, listabuttonon, forwardsbuttonon] })
                            }

                        } else {

                            if (b.id == "backbuton") {

                                if (frame == 1) {

                                    frame--;
                                    const embedprincipal = new MessageEmbed()
                                        .setTitle(`Frames que usen ${bitsin1} bits y ${bitsin2} bits:`)
                                        .addFields(categories)
                                        .setColor(`#84e3ca`);

                                    msg.edit(embedprincipal, { buttons: [backwardsbuttonoff, listabuttonoff, forwardsbuttonon] })

                                } else {

                                    frame--;
                                    const embedback = new MessageEmbed()
                                        .setColor(`#84e3ca`)
                                        .addFields(categories[frame - 1])
                                        .setImage(img[frame - 1])
                                        .setFooter(`Frame ${frame} de ${filas.length}`)
                                    msg.edit(embedback, { buttons: [backwardsbuttonon, listabuttonon, forwardsbuttonon] })

                                }
                            } else {

                                if (b.id == "listabuton") {

                                    frame = 0;
                                    const embed = new MessageEmbed()
                                        .setTitle(`Frames que usen ${bitsin1} bits y ${bitsin2} bits:`)
                                        .addFields(categories)
                                        .setColor(`#84e3ca`);
                                    msg.edit(embed, { buttons: [backwardsbuttonoff, listabuttonoff, forwardsbuttonon] })

                                }

                            }
                        }
                    })
                });
            })
        }
    },
};