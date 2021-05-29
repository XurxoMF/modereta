const { TextChannel } = require("discord.js");

module.exports = {
    name: 'frameadd',
    description: 'Añade un marco a la db',
    priv: true,
    usage: '<Nombre del frame>, <Bits>, <Bits>, <URL Foto>, <Color del embed>',
    execute(client, message, args, db) {
        message.delete();

        if (message.author.id != '556249326951727115') return message.channel.send(`No tienes permisos para usar este comando.`).then((msg) =>{
            msg.delete({ timeout: 5000 })
        });

        let datos = args.join(" ").split(", ")
        let nombre = datos[0].toLowerCase()
        let bit1 = datos[1].toLowerCase()
        let bit2 = datos[2].toLowerCase()
        let foto = datos[3]
        let color = datos[4]

        if (!datos[0]) return message.channel.send('Faltan argumentos. Usa *`help frameadd`* para ver como usarlos.').then((msg) =>{
            msg.delete({ timeout: 5000 })
        });

        db.run(`INSERT INTO karutaframes(nombre, bit1, bit2, foto, color) VALUES(?, ?, ?, ?, ?)`, [nombre, bit1, bit2, foto, color], function (err) {
            if (err) {
                return console.error(err.message)
            }
            message.channel.send(`Se ha agregado el frame ${nombre} a la base de datos.`).then((msg) =>{
                msg.delete({ timeout: 5000 })
            })
        })

    },
};