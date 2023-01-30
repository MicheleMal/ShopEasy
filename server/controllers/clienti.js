import conn from "../db.js"
import bcrypt from "bcryptjs"

export const formRegister = async(req,res)=>{
    res.render("clienti/formAccount", {title: "Shop Easy - My Account"})
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