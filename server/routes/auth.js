import express from "express"
import {insertClienti, loginCliente, logout} from "../controllers/auth.js"

const router = express.Router()

router.post("/register", insertClienti)
router.post("/login", loginCliente)
router.get("/logout", logout)

export default router