import conn from "../db.js"

export const getAllCategorie = (req, res)=>{
    const query = `SELECT nome, descrizione
                    FROM categorie`

    conn.query(query, (error, result)=>{
        if(error) return res.status(400).json({status:"error", message:error.message})

        res.status(200).json({status:"ok", message:result})
    })
}

export const createCategoria = (req, res)=>{
    const data = req.body

    const query = `INSERT INTO Categorie (nome, descrizione)
                    VALUES ( "${data.nome}", "${data.descrizione}" )`

    conn.query(query, (error, result)=>{
        if(error) return res.status(400).json({status: "error", message: error.message})

        res.status(200).json({status:"ok", message:result})
    })
}