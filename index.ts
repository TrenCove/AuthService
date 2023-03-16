import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { LoginRequest } from "./types/interfaces";
import { SignUpNewUser } from "./NewUser";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authenticateToken";

const app: Express = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  /*db.all("SELECT * from users", [], (error, rows) => {
    if (error) {
      console.log(error);
      throw error;
    }
    rows.forEach((row) => {
      console.log(row);
    });
    res.status(200).json(rows);
  });
  res.send("Auth Service Running");*/
});

app.get("/testAuth", authenticateToken, (req: Request, res: Response) => {
  res.send("Authenticated as " + req.user);
});

app.post("/login", (req: Request, res: Response) => {
  //TODO
});

app.post(
  "/signup",
  async (
    req: Request<unknown, unknown, LoginRequest, unknown>,
    res: Response
  ) => {
    try {
      const response = await SignUpNewUser(
        req.body.username,
        req.body.password,
        req.body.name,
        req.body.address
      );
      if (response == 200) {
        //TODO: Might need to return more than just a username
        const token = jwt.sign(req.body.username, "memes");
        res.json(token);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  }
);

app.listen(port, () => {
  console.log(`Auth Service is running at http://localhost:${port}`);
});
