const { TextChannel } = require("discord.js");

module.exports = {
    name: 'frameadd',
    description: 'Añade un marco a la db',
    priv: true,
    usage: '<Nombre del frame>, <Bits>, <Bits>, <URL Foto>, <Color del embed>',
    execute(client, message, args) {

        message.delete();

        if (message.author.id != '556249326951727115') return message.channel.send(`No tienes permisos para usar este comando`);

        let datos = args.join(" ").split(", ")
        let nombre = datos[0].toLowerCase()
        let bit1 = datos[1].toLowerCase()
        let bit2 = datos[2].toLowerCase()
        let foto = datos[3]
        let color = datos[4]


        try {
            const resultado = client.framesDB.establecer({ nombre: nombre, bit1: bit1, bit2: bit2, foto: foto, color: color });
            message.channel.send(`Se ha agragado el frame ***\`${nombre}\`*** a la base de datos.`).then((msg) => {
                msg.delete({ timeout: 5000 })
            });
        } catch (e) {
            console.log(e)
        }
    },
};