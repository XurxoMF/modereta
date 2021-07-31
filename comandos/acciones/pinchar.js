const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'pinchar',
    description: 'Pinchas con el dedo a la persona a la que mencionas.',
    aliases: ['poke'],
    usage: '<@usuario>',
    execute(client, message, args, db) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.imgur.com/LvbCJv5.gif', 'https://i.imgur.com/RVZHFw5.gif', 'https://i.imgur.com/wuhcn51.gif', 'https://i.imgur.com/emcYqAf.gif', 'https://i.imgur.com/U33jNLL.gif', 'https://i.imgur.com/WDl2zIT.gif', 'https://i.imgur.com/r3co7Y3.gif', 'https://i.imgur.com/6BhwvXq.gif'];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Creo que no es buena idea que te pinches a ti mismo.')

        let useractid = useract.id;

        db.get("SELECT * FROM accionesdb WHERE (usuario = ?) AND (accion = ?)", [useractid, nameacction], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {

                db.run("INSERT INTO accionesdb(usuario, accion, cant) VALUES(?, ?, ?)", [useractid, nameacction, 1], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} está pinchando a ${useract} sin piedad.)`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido 1 poke.`);
                    message.channel.send(embed);
                });

            } else {

                let sumar = filas.cant + 1;

                db.run("UPDATE accionesdb SET cant = ? WHERE (usuario = ? ) AND (accion = ? )", [sumar, useractid, nameacction], function (err) {
                    if (err) return console.error(err.message)
                    const embed = new MessageEmbed()
                        .setColor('#a30584')
                        .setDescription(`${usersend} está pinchando a ${useract} sin piedad.`)
                        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                        .setFooter(`${useractname} ha recibido ${sumar} pokes.`);
                    message.channel.send(embed);

                });
            }
        })
    },
};