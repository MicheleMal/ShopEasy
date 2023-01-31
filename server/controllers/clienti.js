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
  const { id } = req.query;

  if (data["ruolo"]) {
    const getIdRuolo = `SELECT r.Id
                            FROM ruoli as r
                            WHERE r.nome = "${data["ruolo"]}"`;

    conn.query(getIdRuolo, (error, idRuolo) => {
      if (error)
        return res
          .status(400)
          .json({ status: "error", message: error.message });
      const query = `UPDATE Clienti SET ruolo = ${idRuolo[0].Id} WHERE Id = ${id}`;

      console.log(query);
      conn.query(query, data, (error, result) => {
        if (error)
          return res
            .status(400)
            .json({ status: "error", message: error.message });

        res.status(200).json({ status: "ok", message: result });
      });
    });
  } else {
    const query = `UPDATE clienti SET ? WHERE Id = ${id}`;

    conn.query(query, data, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ status: "error", message: error.message });

      res.status(200).json({ status: "ok", message: result });
    });
  }
};

export const deleteCliente = async (req, res) => {
  const { id } = req.query;
  const query = `DELETE FROM clienti
                    WHERE id = ${id}`;

  conn.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ status: "erorr", message: error.message });

    res.status(200).json({ status: "ok", message: result });
  });
};
