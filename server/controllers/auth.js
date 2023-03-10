import conn from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const insertClienti = async (req, res) => {
  const ruolo = "user";
  const cliente = req.body;

  const pwHash = await bcrypt.hash(cliente.password, 10);

  const quey = `INSERT INTO clienti (nome, cognome, email, password, citta, provincia, indirizzo, nCivico, CAP, nTelefono, ruolo)
                  VALUES ("${cliente.nome}", "${cliente.cognome}", "${cliente.email}", "${pwHash}", "${cliente.citta}", "${cliente.provincia}", "${cliente.indirizzo}", "${cliente.nCivico}", "${cliente.CAP}", "${cliente.nTelefono}", "${ruolo}")`;

  conn.query(quey, (error, result) => {
    if (error)
      return res.status(400).json({ status: "error", message: error.message });

    res.status(200).json({ status: "ok", message: result });
  });
};

export const loginCliente = async (req, res) => {
  const data = req.body;

  const query = `SELECT *
                    FROM clienti
                    WHERE email = "${data.email}"`;

  conn.query(query, async (error, result) => {
    if (error)
      return res.status(400).json({ status: "error", message: error.message });

    if (result.length == 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Username o password errati" });
    } else {
      const pwHashed = result[0].password;

      if (await bcrypt.compare(data.password, pwHashed)) {
        const token = jwt.sign(
          {
            id: result[0].id,
            ruolo: result[0].ruolo,
          },
          process.env.JWT_SECRET
        );

        //return res.status(200).json({status:"ok", message: token})
        return res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
          })
          .status(200)
          .render("../views/clienti/account", {
            title: "Shop Easy - My Account",
            user: result[0],
          });
      }
    }
    return res
      .status(400)
      .json({ status: "error", message: "Username o password errati" });
  });
};

export const logout = (req, res)=>{
  return res.clearCookie("access_token").render("../views/clienti/formAccount", {title: "Shop Easy - Sign in"})
}