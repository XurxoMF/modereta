const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'matar',
    description: 'Asesinas a la persona a la que menciones.',
    aliases: ['asesinar', 'kill'],
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.imgur.com/KQrq6TZ.gif', 'https://i.imgur.com/kdoKEI3.gif', 'https://i.imgur.com/8Auhs2f.gif', 'https://i.imgur.com/8lsBccU.gif', 'https://i.imgur.com/NLTWZwo.gif', 'https://i.imgur.com/sPfFzsJ.gif', 'https://i.imgur.com/1tIUVY2.gif'];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('No creo que sea muy buena idea matarte a ti mismo. OxO')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} ha acabado con ${useract} X_X`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha sido asesinado 1 vez.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} ha acabado con ${useract} X_X`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha sido asesinado ${sumar} veces.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};