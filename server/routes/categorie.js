import express from "express"
import { createCategoria, getAllCategorie } from "../controllers/categorie.js"

const router = express.Router()

// Stampa tutte le categorie
router.get("/getAll",getAllCategorie)

// Creazione nuova categoria
router.post("/create", createCategoria)

export default router