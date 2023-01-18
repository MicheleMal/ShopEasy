import conn from "../db.js"

export const insertRuolo = async (req, res)=>{
    const ruolo = req.body

    const query = ` INSERT INTO Ruoli (nome, descrizione)
                    VALUES ("${ruolo.nome}", "${ruolo.descrizione}")`
    
    conn.query(query, (error, result)=>{
        if(error) return res.status(400).json({status: "error", message: error.message})

        res.status(200).json({status:"ok", message:result})
        // try {
        //     res.status(200).json({status: "ok",result})
        // } catch (error) {
        //     res.status(400).json({
        //         status: "error",
        //         message: error.message
        //     })
        // }
    })
}