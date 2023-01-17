import express from "express"
import { insertClienti } from "../controllers/clienti.js"

const router = express.Router()

// Registrazione cliente
router.post("/register", insertClienti)


export default router
