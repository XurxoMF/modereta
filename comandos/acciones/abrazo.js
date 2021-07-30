const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'abrazo',
    description: 'Le das un abrazo a la persona a la que menciones.',
    aliases: ['abrazar', 'hug'],
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.imgur.com/3VkyJRf.gif', 'https://i.imgur.com/7NWzEo9.gif', 'https://i.imgur.com/Ac5hL7R.gif', 'https://i.imgur.com/YyTLSSW.gif', 'https://i.imgur.com/AJT8rjJ.gif', 'https://i.imgur.com/aOowZys.gif', 'https://i.imgur.com/iImslkE.gif', 'https://i.imgur.com/LBPYSzD.gif'];
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