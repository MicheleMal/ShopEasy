import express from "express"
import cors from "cors"
import clientiRoutes from "./routes/clienti.js"
import ruoliRoutes from "./routes/ruoli.js"
import mongoose from "mongoose"

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 5000
const URL_DB = "mongodb://127.0.0.1:27017/ShopEasy"

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

mongoose.connect(URL_DB)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
})
.catch(error => console.error(error))