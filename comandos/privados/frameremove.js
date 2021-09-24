module.exports = {
    name: 'frameremove',
    description: 'Elimina un marco a la db',
    priv: true,
    usage: '<Nombre del frame>',
    async execute(client, message, args, kfdb, acciondb) {
        message.delete();

        if (message.author.id != '556249326951727115') return message.channel.send(`No tienes permisos para usar este comando.`).then((msg) => {
            msg.delete({ timeout: 5000 });
        });

        let datos = args.join(" ").split(",");

        if (!datos[0]) return message.channel.send('Faltan argumentos, usa \`=help frameadd\` para ver como usar el comando!').then((msg) => {
            msg.delete({ timeout: 5000 })
        });

        let anombre = datos[0].trim().toLowerCase();

        kfdb.findOne({ nombre: `${anombre}` }, async function (err, filas) {
            console.log(filas);
            if (err) return message.channel.send(`Se ha producido un error al ejecutar el comando.`)
            if (filas == null) {
                return message.channel.send(`El frame ${anombre} no existe.`);
            }
            await kfdb.deleteOne({ nombre: anombre }).then((i) => {
                message.channel.send(`El frame ${anombre} se ha eliminado con éxito.`);
            }).catch((err) => {
                return console.log(err);
            });
        });
    },
};