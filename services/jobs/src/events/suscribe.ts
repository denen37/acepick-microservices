import { Profession } from "../models/Profession";
import { ConsumeMessage } from "./handler";
import { Op } from "sequelize";

export const suscribe = async () => {
    await ConsumeMessage('get_profs', async (msg) => {
        const profs = await Profession.findAll({
            where: {
                id: msg
            },

            attributes: ['id', 'title', 'image']
        })

        return profs.map(prof => prof.dataValues)
    }, true)


    await ConsumeMessage('search_prof',
        async (msg) => {
            console.log(msg)
            const profIds = await Profession.findAll({
                where: {
                    title: {
                        [Op.like]: `%${msg.search}%`
                    }
                },
                attributes: ['id']
            })

            return profIds.map(prof => prof.dataValues)
        }, true)
}