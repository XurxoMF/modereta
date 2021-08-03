const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'puñetazo',
    description: 'Le pegas a la persona a la que menciones.',
    aliases: ['golpear', 'slap', 'punch'],
    usage: '<@usuario>',
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/QdSVpPXT/1.gif',
            'https://i.postimg.cc/bJZGYTf2/2.gif',
            'https://i.postimg.cc/nhnC9Ztx/3.gif',
            'https://i.postimg.cc/rwywFJSF/4.gif',
            'https://i.postimg.cc/6343xpCr/5.gif',
            'https://i.postimg.cc/KvSKFBqR/6.gif',
            'https://i.postimg.cc/RC3fvMvb/7.gif',
            'https://i.postimg.cc/hGyzqY6B/8.gif',
            ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Noooo, no te pegues a ti mismo, que haces?? X_X')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} acaba de golpear a ${useract} X_X`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido 1 puñetazo.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} acaba de golpear a ${useract} X_X`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido ${sumar} puñetazos.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};