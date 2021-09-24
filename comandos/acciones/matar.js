const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'matar',
    description: 'Asesinas a la persona a la que menciones.',
    aliases: ['asesinar', 'kill'],
    usage: '<@usuario>',
    async execute(client, message, args, kfdb, acciondb) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/FFbcnTpT/1.gif',
            'https://i.postimg.cc/CKWD9t9Q/2.gif',
            'https://i.postimg.cc/YCDQzjRk/3.gif',
            'https://i.postimg.cc/J0QkDh0f/4.gif',
            'https://i.postimg.cc/fLmXsCNT/5.gif',
            'https://i.postimg.cc/hGJTygZm/6.gif',
            'https://i.postimg.cc/sDcY1TZM/7.gif',
        ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('No creo que sea muy buena idea matarte a ti mismo. OxO')

        let useractid = useract.id;

        const filas = await acciondb.findOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }).exec();

        if (!filas) {

            await acciondb.create({ usuario: `${useractid}`, accion: `${nameacction}`, cant: '1' }).then((c) => {
                const embed = new MessageEmbed()
                    .setColor('#a30584')
                    .setDescription(`${usersend} ha acabado con ${useract} X_X`)
                    .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                    .setFooter(`${useractname} ha sido asesinad@ 1 vez.`);
                message.channel.send(embed);
            }).catch(err => {
                console.log(err.message);
            });

        } else {

            let sumar = filas.cant + 1;

            await acciondb.updateOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }, { cant: `${sumar}` });

            const embed = new MessageEmbed()
                .setColor('#a30584')
                .setDescription(`${usersend} ha acabado con ${useract} X_X`)
                .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                .setFooter(`${useractname} ha sido asesinad@ ${sumar} veces.`);
            message.channel.send(embed);
        }
    },
};