import conn from "../db.js"
import bcrypt from "bcryptjs"

export const insertClienti = async (req, res)=>{
    const ruolo = "cliente"
    const cliente = req.body

    const pwHash = await bcrypt.hash(cliente.password, 10)

    const queryIdRuolo = `SELECT r.Id
                            FROM ruoli as r
                            WHERE r.nome = "cliente"`

    conn.query(queryIdRuolo, (error, idRuolo)=>{
        if(error) return res.status(400).json({status: "error", message: error.message})

        const quey = `INSERT INTO Clienti (nome, cognome, email, password, citta, provincia, indirizzo, nCivico, CAP, nTelefono, ruolo)
                  VALUES ("${cliente.nome}", "${cliente.cognome}", "${cliente.email}", "${pwHash}", "${cliente.citta}", "${cliente.provincia}", "${cliente.indirizzo}", "${cliente.nCivico}", "${cliente.CAP}", "${cliente.nTelefono}", "${idRuolo[0].Id}")`
        
            
        conn.query(quey, (error, result)=>{
            if(error) return res.status(400).json({status: "error", message: error.message})

            res.status(200).json({status: "ok", message: result})
        })
    })    
}

export const loginCliente = async (req, res)=>{
    const data = req.body

    // const query = `SELECT c.nome, c.cognome, c.email, c.citta, c.provincia, c.indirizzo, c.nCivico, c.CAP, c.nTelefono, r.nome as nomeRuolo
    //                 FROM clienti as c
    //                 INNER JOIN ruoli as r
    //                 ON r.Id = c.ruolo
    //                 WHERE email = "${data.email}" AND password = "${data.password}"`

    // conn.query(query, (error, result)=>{
    //     if(error) return res.status(400).json({status:"error", message: error.message})

    //     res.status(200).json({status:"ok", record: result})
    // })

    const query = `SELECT *
                    FROM Clienti
                    WHERE email = "${data.email}"`

    conn.query(query, async(error, result)=>{
        if(error) return res.status(400).json({status:"error", message: error.message})

        if(result.length == 0){
            return res.status(400).json({status:"error", message:"Username o password errati"})
        }else{
            const pwHashed = result[0].password

            if(await bcrypt.compare(data.password, pwHashed)){
                return res.status(200).json({status:"ok", message: "Registrazione effettuata"})
            }
        }
        res.status(400).json({status:"error", message:"Username o password errati"})
    })
}

export const modifyCliente =  (req, res)=>{
    const data = req.body
    const {id} = req.query

    if(data["ruolo"]){
        const getIdRuolo = `SELECT r.Id
                            FROM ruoli as r
                            WHERE r.nome = "${data["ruolo"]}"`
        
        conn.query(getIdRuolo, (error, idRuolo)=>{
            if(error) res.status(400).json({status:"error", message:error.message})
            const query = `UPDATE Clienti SET ruolo = ${idRuolo[0].Id} WHERE Id = ${id}`

            console.log(query);
            conn.query(query, data, (error, result)=>{
                if(error) return res.status(400).json({status:"error", message:error.message})
        
                res.status(200).json({status: "ok", message: result})
            })
        })
    }else{
        const query = `UPDATE Clienti SET ? WHERE Id = ${id}`
    
        conn.query(query, data, (error, result)=>{
            if(error) return res.status(400).json({status:"error", message:error.message})
    
            res.status(200).json({status: "ok", message: result})
        })
    }

}

export const deleteCliente = async (req, res)=>{
    const {id} = req.query
    const query = `DELETE FROM Clienti
                    WHERE id = ${id}`

    conn.query(query, (error, result)=>{
        if(error) return res.status(400).json({status:"erorr", message:error.message})

        res.status(200).json({status: "ok", message: result})
    })
}