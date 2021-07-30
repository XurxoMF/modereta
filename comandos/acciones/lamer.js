const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'lamer',
    description: 'Le pegas un lametón a la persona a la que menciones.',
    aliases: ['lick'],
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.imgur.com/VH9ck5Y.gif', 'https://i.imgur.com/1U5B26w.gif', 'https://i.imgur.com/tG8Ardw.gif', 'https://i.imgur.com/HZMZb71.gif', 'https://i.imgur.com/Wfh9QVE.gif', 'https://i.imgur.com/Uic3qj8.gif', 'https://i.imgur.com/nQs2Z1H.gif'];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Me da la sensación de que eres medio gato...')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} está lamiendo a ${useract}...)`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido 1 lametón.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} está lamiendo a ${useract}...`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido ${sumar} lametones.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};