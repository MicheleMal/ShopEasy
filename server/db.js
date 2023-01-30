import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const conn = mysql2.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

conn.connect(error=>{
    try {
        console.log(`Connection with the database successful`);
    } catch (error) {
        console.error(error)
    }
})

export default conn