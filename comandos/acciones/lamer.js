const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'lamer',
    description: 'Le pegas un lametón a la persona a la que menciones.',
    aliases: ['lick'],
    usage: '<@usuario>',
    async execute(client, message, args, kfdb, acciondb) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/1t26hdTd/1.gif',
            'https://i.postimg.cc/pdVKDzzs/3.gif',
            'https://i.postimg.cc/rphxgs9M/4.gif',
            'https://i.postimg.cc/SN8Lqymf/5.gif',
            'https://i.postimg.cc/cC33smGL/6.gif',
            'https://i.postimg.cc/g2WV2fJF/7.gif',
            'https://i.postimg.cc/G3TGJcTn/8.gif',
        ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Me da la sensación de que eres medio gato...')

        let useractid = useract.id;

        const filas = await acciondb.findOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }).exec();

        if (!filas) {

            await acciondb.create({ usuario: `${useractid}`, accion: `${nameacction}`, cant: '1' }).then((c) => {
                const embed = new MessageEmbed()
                    .setColor('#a30584')
                    .setDescription(`${usersend} está lamiendo a ${useract}...)`)
                    .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                    .setFooter(`${useractname} ha recibido 1 lametón.`);
                message.channel.send(embed);
            }).catch(err => {
                console.log(err.message);
            });

        } else {

            let sumar = filas.cant + 1;

            await acciondb.updateOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }, { cant: `${sumar}` });

            const embed = new MessageEmbed()
                .setColor('#a30584')
                .setDescription(`${usersend} está lamiendo a ${useract}...`)
                .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                .setFooter(`${useractname} ha recibido ${sumar} lametones.`);
            message.channel.send(embed);
        }
    },
};