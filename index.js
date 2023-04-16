import express from 'express';
import dotenv from "dotenv"
import morgan from "morgan";
import mongoose from "mongoose";
import connect from "./config/db.js";
import ProductRouter from './routes/ProductRoute.js';
import userRoute from "./routes/userRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import cookieParser from "cookie-parser";
import cros from "cors"


dotenv.config();
connect();

const PORT = process.env.PORT || 3000;

const app = new express();

if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cros());
app.get('/', (req, res) => {
    res.send('API is running...')
})
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(function (err, req, res, next) {
    next(catchError(404));
});
app.use("/user", userRoute);
app.use("/product", ProductRouter);
app.use("/category", categoryRoute);


app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`))