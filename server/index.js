import express from "express"
import cors from "cors"
import clientiRoutes from "./routes/clienti.js"
import ruoliRoutes from "./routes/ruoli.js"


const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

app.use("/clienti", clientiRoutes)
app.use("/ruolo", ruoliRoutes)

app.get("/", (req, res)=>{
    res.status(200).json({
        status: "ok",
        message: "Ok"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})