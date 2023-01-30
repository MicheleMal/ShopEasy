import express from "express"
import {insertClienti, loginCliente} from "../controllers/auth.js"

const router = express.Router()

router.post("/register", insertClienti)
router.post("/login", loginCliente)

export default router