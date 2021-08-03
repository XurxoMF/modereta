const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'observar',
    description: 'Miras fijamente a la persona a la que mencionas.',
    aliases: ['ver', 'mirar', 'stare'],
    usage: '<@usuario>',
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/6Qwxz5pj/1.gif',
            'https://i.postimg.cc/ZKGSBLth/2.gif',
            'https://i.postimg.cc/HL2DNDJp/3.gif',
            'https://i.postimg.cc/8PJGz0YH/4.gif',
            'https://i.postimg.cc/Gmv1ksdT/5.gif',
            ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Tus ojos giran 180º?? WoW Impresionante.')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} está observando fijamente a ${useract}.)`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`A ${useractname} l@ han observado fijamente 1 vez.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} está observando fijamente a ${useract}.`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`A ${useractname} l@ han observado fijamente ${sumar} veces.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};