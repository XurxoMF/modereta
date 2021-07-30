const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'beso',
    description: 'Le das un beso a la persona a la que meciones.',
    aliases: ['besar', 'kiss'],
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.imgur.com/3o4fcHC.gif', 'https://i.imgur.com/70X0ATj.gif', 'https://i.imgur.com/n6ez8mp.gif', 'https://i.imgur.com/RkW6p3y.gif', 'https://i.imgur.com/MDcGQUA.gif', 'https://i.imgur.com/7gWnN7J.gif', 'https://i.imgur.com/dxmdJ8k.gif', 'https://i.imgur.com/0SnThEO.gif'];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Es un poco difícil que te beses a ti mismo no crees?')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} le ha dado un beso a ${useract}`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido 1 beso.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} le ha dado un beso a ${useract}`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido ${sumar} besos.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};