module.exports = {
    name: 'frameadd',
    description: 'Añade un marco a la db',
    priv: true,
    usage: '<Nombre del frame>, <Bits>, <Bits>, <URL Foto>, <Color del embed>',
    execute(client, message, args, kfdb, acciondb) {
      message.delete();
  
      if (message.author.id != '556249326951727115') return message.channel.send(`No tienes permisos para usar este comando.`).then((msg) =>{
          msg.delete({ timeout: 5000 })
      });
  
      let datos = args.join(" ").split(",");
  
      if (!datos[4]) return message.channel.send('Faltan argumentos, usa \`=help frameadd\` para ver como usar el comando!').then((msg) =>{
        msg.delete({ timeout: 5000 })
    });
  
      let anombre = datos[0].trim().toLowerCase();
      let abit1 = datos[1].trim().toLowerCase();
      let abit2 = datos[2].trim().toLowerCase();
      let afoto = datos[3].trim();
      let acolor = datos[4].trim();
  
      kfdb.findOne({ nombre: `${anombre}` }, function (err, filas) {
        if (err) return message.channel.send(`Se ha producido un error al ejecutar el comando.`).then((msg) =>{
            msg.delete({ timeout: 5000 })
        });
        if (filas) {
          return message.channel.send(`El frame ${anombre} ya existe.`).then((msg) =>{
            msg.delete({ timeout: 5000 })
        });
        }
        kfdb.create({
          nombre: anombre,
          bit1: abit1,
          bit2: abit2,
          foto: afoto,
          color: acolor
        }).then((i) => {
          message.channel.send(`El frame ${anombre} se ha guardado con éxito.`).then((msg) =>{
            msg.delete({ timeout: 5000 })
        });
        }).catch((err) => {
          return console.log(err);
        });
      });
  
    },
  };