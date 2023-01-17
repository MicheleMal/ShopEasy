import express from 'express'
import {insertRuolo} from "../controllers/ruoli.js"

const router = express.Router()

// Inserimento nuovo ruolo
router.post("/inRuolo", insertRuolo)

export default router