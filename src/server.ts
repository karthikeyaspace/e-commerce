import express from "express";
import cors from "cors";
import expressAsyncHandler from "express-async-handler";
import { env } from "./config/env";
import orderRoutes from "./routes/order.route";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("E commerce server");
});

app.use("/user", expressAsyncHandler(userRoutes));
app.use("/product", expressAsyncHandler(productRoutes));
app.use("/order", expressAsyncHandler(orderRoutes));

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
