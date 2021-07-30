const { TextChannel } = require("discord.js");

module.exports = {
    name: 'frameremove',
    description: 'Elimina un marco a la db',
    priv: true,
    usage: '<Nombre del frame>',
    execute(client, message, args, db) {
        message.delete();

        if (message.author.id != '556249326951727115') return message.channel.send(`No tienes permisos para usar este comando.`).then((msg) =>{
            msg.delete({ timeout: 5000 })
        });

        let datos = args.join(" ").split(",")
        let nombre = datos[0].trim().toLowerCase()

        if (!datos[0]) return message.channel.send('Faltan argumentos. Usa *`help frameremove`* para ver como usarlos.').then((msg) =>{
            msg.delete({ timeout: 5000 })
        });

        db.get("SELECT * FROM karutaframes WHERE nombre = ?", [nombre], (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas) {
                return message.channel.send(`No existe ningún frame con el nombre ${nombre}.`).then((msg) =>{
                    msg.delete({ timeout: 5000 })
                })
            } else {
                db.run("DELETE FROM karutaframes WHERE nombre = ?", [nombre], function(err) {
                    if (err) return console.error(err.message)
                    message.channel.send(`Se ha eliminado correctamente el frame ${nombre}.`).then((msg) =>{
                        msg.delete({ timeout: 5000 })
                    })
                })
            }
        })
    },
};