import conn from "../db.js"

export const getAllProdotti = (req, res)=>{
    const query = `SELECT p.titolo, p.descrizione, p.immagine, p.prezzo, p.prezzoScontato, c.nome as categoria
                    FROM Prodotti as p
                    INNER JOIN Categorie as c
                    ON c.Id = p.categoria`

    conn.query(query, (error, result)=>{
        if(error) return res.status(400).json({status: "error", message: error.message})

        res.render("prodotti/catalogo",{title:"Shop Easy", data: result})
        //res.status(200).json({status:"ok", message:result})
    })
}

export const insertProdotto = (req, res)=>{
    const data = req.body

    const idCategoria = `SELECT Id
                        FROM Categorie
                        WHERE nome = "${data["nomeCategoria"]}"`
    

    conn.query(idCategoria, (error, result)=>{
        if(error) return res.status(400).json({status: "error", message: error.message})

        const query = `INSERT INTO Prodotti (titolo, descrizione, immagine, prezzo, prezzoScontato, categoria)
                        VALUES ("${data.titolo}", "${data.descrizione}", "${data.immagine}", ${data.prezzo}, ${data.prezzoScontato}, ${result[0].Id})`

        conn.query(query, (error, result)=>{
            if(error) return res.status(400).json({status: "error", message:error.message})

            res.status(200).json({status:"ok", message:result})
        })
    })
}

//FIXME: impostare anche la modifica della categoria
export const modifyProdotto = (req, res)=>{
    const data = req.body
    const {id} = req.query

    const query = `UPDATE Prodotti SET ? WHERE Id = ${id}`

    conn.query(query, data, (error, result)=>{
        if(error) return res.status(400).json({status: "error", message: error.message})

        res.status(200).json({status:"ok", message:result})
    })
}

export const deleteProdotto = (req, res)=>{
    const {id} = req.query

    const query = `DELETE FROM prodotti
                    WHERE Id = ${id}`

    conn.query(query, (error,result)=>{
        if(error) return res.status(400).json({status:"erorr", message:error.message})

        res.status(200).json({status: "ok", message: result})
    })
}