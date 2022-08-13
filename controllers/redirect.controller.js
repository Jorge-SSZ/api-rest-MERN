import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;
        const link = await Link.findOne({nanoLink})

        if(!link) return res.status(404).json({ error: "El link no existe"});

        return res.redirect(link.longLink)
    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato de id incorrecto"})
        }

        return res.status(500).json({ error: "Ha ocurrido un errror en el servidor"})
    }
}