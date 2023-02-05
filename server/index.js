import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import clientiRoutes from "./routes/clienti.js";
import categorieRoutes from "./routes/categorie.js";
import authRoutes from "./routes/auth.js";
import prodottiRoutes from "./routes/prodotti.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(cookieParser())

app.use("/auth", authRoutes);
app.use("/clienti", clientiRoutes);
app.use("/categoria", categorieRoutes);
app.use("/prodotto", prodottiRoutes);

app.get("/", (req, res) => {
  // res.status(200).json({
  //     status: "ok",
  //     message: "Ok"
  // })
  res.render("index", { title: "Shop Easy - Home"});
});

app.get("*", (req, res) => {
  res.render("404Page", { title: "Shop Easy - 404" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
