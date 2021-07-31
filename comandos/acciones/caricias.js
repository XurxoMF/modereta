const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'caricias',
    description: 'Acaricias a la persona a la que mencionas.',
    aliases: ['acariciar', 'pat'],
    usage: '<@usuario>',
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.imgur.com/QhFSFqs.gif', 'https://i.imgur.com/Tmeg8fF.gif', 'https://i.imgur.com/XKe4Vhv.gif', 'https://i.imgur.com/X1Qt8RI.gif', 'https://i.imgur.com/9P9RRwK.gif', 'https://i.imgur.com/xgT4j1q.gif', 'https://i.imgur.com/4gk6X7B.gif', 'https://i.imgur.com/n7PIj6j.gif'];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Estás falto de cariño?? Que alguien le de unas caricias!! :)')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} está acariciando a ${useract}, que kawaii.`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido 1 caricia.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} está acariciando a ${useract}, que kawaii.`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido ${sumar} caricias.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};