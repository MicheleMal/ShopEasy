import conn from "../db.js"
import bcrypt from "bcryptjs"

export const formRegister = async(req,res)=>{
    res.render("clienti/formAccount", {title: "Shop Easy - My Account"})
}

export const insertClienti = async (req, res)=>{
    const ruolo = "user"
    const cliente = req.body

    const pwHash = await bcrypt.hash(cliente.password, 10)

    const queryIdRuolo = `SELECT r.id
                            FROM ruoli as r
                            WHERE r.nome = "${ruolo}"`

    conn.query(queryIdRuolo, (error, idRuolo)=>{
        if(error) return res.status(400).json({status: "error", message: error.message})

        const quey = `INSERT INTO clienti (nome, cognome, email, password, citta, provincia, indirizzo, nCivico, CAP, nTelefono, ruolo)
                  VALUES ("${cliente.nome}", "${cliente.cognome}", "${cliente.email}", "${pwHash}", "${cliente.citta}", "${cliente.provincia}", "${cliente.indirizzo}", "${cliente.nCivico}", "${cliente.CAP}", "${cliente.nTelefono}", "${idRuolo[0].id}")`
        
        conn.query(quey, (error, result)=>{
            if(error) return res.status(400).json({status: "error", message: error.message})

            res.status(200).json({status: "ok", message: result})
        })
    })    
}

export const loginCliente = async (req, res)=>{
    const data = req.body

    const query = `SELECT *
                    FROM clienti
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
        const query = `UPDATE clienti SET ? WHERE Id = ${id}`
    
        conn.query(query, data, (error, result)=>{
            if(error) return res.status(400).json({status:"error", message:error.message})
    
            res.status(200).json({status: "ok", message: result})
        })
    }

}

export const deleteCliente = async (req, res)=>{
    const {id} = req.query
    const query = `DELETE FROM clienti
                    WHERE id = ${id}`

    conn.query(query, (error, result)=>{
        if(error) return res.status(400).json({status:"erorr", message:error.message})

        res.status(200).json({status: "ok", message: result})
    })
}