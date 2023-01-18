export const insertRuolo = async (req, res)=>{
    const ruolo = req.body

    const newRuolo = new Ruolo(ruolo)

    try {
        await newRuolo.save() // Insert DB
        res.status(200).json(newRuolo)
    } catch (error) {
        res.status(400).json({message: error})
    }
}