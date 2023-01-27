import express from "express"
import cors from "cors"
import clientiRoutes from "./routes/clienti.js"
import ruoliRoutes from "./routes/ruoli.js"
import categorieRoutes from "./routes/categorie.js"
import prodottiRoutes from "./routes/prodotti.js"


const PORT = process.env.PORT || 5000

const app = express()

app.set("view engine", "ejs")

app.use(express.json())
app.use(cors())

app.use("/clienti", clientiRoutes)
app.use("/ruolo", ruoliRoutes)
app.use("/categoria", categorieRoutes)
app.use("/prodotto", prodottiRoutes)

app.get("/", (req, res)=>{
    // res.status(200).json({
    //     status: "ok",
    //     message: "Ok"
    // })
    res.render("index", {title: "Shop Easy"})
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})