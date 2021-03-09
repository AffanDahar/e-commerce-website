const express = require("express");

const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRouter");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const { errorHandler, notFound } = errorMiddleware;

dotenv.config();
connectDB();

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);


app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  console.log((path.join(__dirname, '/frontend/build')))
  
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend','build', 'index.html'));
  });

} else {
  app.get("/", (req, res) => {
    res.send("Api is running..");
  });
}

//error middleware

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`server is in ${process.env.NODE_ENV} mode and runing on ${PORT}`)
);
