const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'abrazo',
    description: 'Le das un abrazo a la persona a la que menciones.',
    aliases: ['abrazar', 'hug'],
    usage: '<@usuario>',
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/PrpPmNBm/1.gif',
            'https://i.postimg.cc/vTp8PLp5/2.gif',
            'https://i.postimg.cc/76ZLbL3J/3.gif',
            'https://i.postimg.cc/PfcqrTPN/4.gif',
            'https://i.postimg.cc/hjZtmqsy/5.gif',
            'https://i.postimg.cc/L8j5bw45/6.gif',
            'https://i.postimg.cc/C5ZLH66F/7.gif',
            'https://i.postimg.cc/BQrtN40R/8.gif',
            ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Si quieres un abrazo solo pídelo, pero no te abrazes a ti mismo que es complicado >_<')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} le ha dado un abrazo a ${useract} >_<`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido 1 abrazo.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} le ha dado un abrazo a ${useract} >_<`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido ${sumar} abrazos.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};