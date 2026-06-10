import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import cors from "cors";

import usersRoutes from "./routers/users.routes.js";
import authUserRoutes from "./routers/authUser.route.js";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://cafe-aroma-rock.vercel.app/login"
];

app.use(morgan("dev"));
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(usersRoutes);
app.use(authUserRoutes);

app.use((err, req, res, next) => {
    return res.json({ message: err.message });
});

app.listen((process.env.PORT || 3000), () => { 
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
