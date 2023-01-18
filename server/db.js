import mysql2 from "mysql2"

const conn = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ShopEasy"
})

conn.connect(error=>{
    try {
        console.log(`Connection with the database successful`);
    } catch (error) {
        console.error(error)
    }
})

export default conn