import { Pool } from "pg";
import config from "./config.js";

const pool = new Pool(config.db);

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión a la base de datos exitosa:", res.rows[0]);
    }
});

export default pool;
