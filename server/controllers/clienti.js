import conn from "../db.js";
import jwt from "jsonwebtoken";

export const formRegister = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.render("../views/clienti/formAccount", {
      title: "Shop Easy - Sign in",
    });
  }

  const userToken = jwt.verify(token, process.env.JWT_SECRET);
  const query = `SELECT *
        FROM clienti
        WHERE id=${userToken.id}`;
  conn.query(query, (error, user) => {
    if (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
    res.render("../views/clienti/account", { title: "Shop Easy - My Account", user: user[0] });
  });
};

export const modifyCliente = (req, res) => {
  const data = req.body;
  const id = req.id

  const query = `UPDATE clienti SET ? WHERE id = ${id}`

  conn.query(query, data, (error, result)=>{
    if(error){
      return res.status(400).json({status:"error", message:error.message})
    }
    return res.status(200).json({status:"ok", message:result})
  })
}

export const modifyRuolo = (req, res)=>{
  const data = req.body

  const query = `UPDATE clienti SET ruolo = "${data.ruolo}" WHERE email = "${data.email}"`

  conn.query(query, data, (error, result)=>{
    if(error){
      return res.status(400).json({status:"error", message:error.message})
    }
    const getUser = `SELECT *
                    FROM clienti
                    WHERE id = ${req.id}`
    conn.query(getUser, (error, user)=>{
      if(error){
        return res.status(400).json({status:"error", message:error.message})
      }
      return res.status(200).render("../views/clienti/account", {title: "Shop Easy - My Accout", user: user[0]})
    })
    
    //return res.status(200).json({status:"ok", message:result})
  })
}

export const deleteCliente = async (req, res) => {
  const id = req.id
  const query = `DELETE FROM clienti
                    WHERE id = ${id}`;

  conn.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ status: "erorr", message: error.message });

    return res.clearCookie("access_token").render("../views/clienti/formAccount", {title: "Shop Easy - Sign in"})
    //res.status(200).json({ status: "ok", message: result });
  });
};
