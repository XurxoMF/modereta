const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'cosquillas',
    description: 'Le haces cosquillas la persona a la que menciones.',
    aliases: ['tickle'],
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.imgur.com/wLXjqUk.gif', 'https://i.imgur.com/5RfR9DM.gif', 'https://i.imgur.com/BxyhBhc.gif', 'https://i.imgur.com/CttTED4.gif', 'https://i.imgur.com/JWYxo4i.gif', 'https://i.imgur.com/M676O1j.gif', 'https://i.imgur.com/ooD1Pxm.gif'];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Cosquillas a uno mismo?? Que raro, no es mejor a otra persona??')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} le está haciendo cosquillas a ${useract}.`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`A ${useractname} le han hecho cosquillas 1 vez.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} le está haciendo cosquillas a ${useract}.`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`A ${useractname} le han hecho cosquillas ${sumar} veces.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};