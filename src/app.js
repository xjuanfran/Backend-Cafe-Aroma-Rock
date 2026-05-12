import express from 'express';
import morgan from "morgan";
import cors from "cors";

import usersRoutes  from "./routers/users.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(usersRoutes);

app.use((err, req, res, next) => {
    return res.json({ message: err.message });
});

app.listen((process.env.PORT || 3000), () => { 
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    console.log("http://localhost:3000/");

});
