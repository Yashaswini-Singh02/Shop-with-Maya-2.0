import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { usersRouter } from "./users/users.route";
import { outfitsRouter } from "./outfits/outfits.route";
import connectDb from "./utils/connectDb";
import cors from "cors";

connectDb();

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/outfits", outfitsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Shop with Maya server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
