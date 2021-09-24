const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'morder',
    description: 'Muerdes la persona a la que menciones.',
    aliases: ['bite'],
    usage: '<@usuario>',
    async execute(client, message, args, kfdb, acciondb) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/63XqrNkt/1.gif',
            'https://i.postimg.cc/wBJ3RBbw/2.gif',
            'https://i.postimg.cc/52D6tzpH/3.gif',
            'https://i.postimg.cc/J46s9vk5/4.gif',
            'https://i.postimg.cc/FHYYmpb5/6.gif',
            'https://i.postimg.cc/4dQdwSGt/7.gif',
            'https://i.postimg.cc/HnWLN9WN/8.gif',
        ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Te va a doler si te muerdes a ti mismo así que no te lo recomiendo :)')

        let useractid = useract.id;

        const filas = await acciondb.findOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }).exec();

        if (!filas) {

            await acciondb.create({ usuario: `${useractid}`, accion: `${nameacction}`, cant: '1' }).then((c) => {
                const embed = new MessageEmbed()
                    .setColor('#a30584')
                    .setDescription(`${usersend} ha mordido a ${useract} y le ha dejado marca.`)
                    .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                    .setFooter(`${useractname} ha recibido 1 mordisco.`);
                message.channel.send(embed);
            }).catch(err => {
                console.log(err.message);
            });

        } else {

            let sumar = filas.cant + 1;

            await acciondb.updateOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }, { cant: `${sumar}` });

            const embed = new MessageEmbed()
                .setColor('#a30584')
                .setDescription(`${usersend} ha mordido a ${useract} y le ha dejado marca.`)
                .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                .setFooter(`${useractname} ha recibido ${sumar} mordiscos.`);
            message.channel.send(embed);
        }
    },
};