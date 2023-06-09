import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { LoginRequest, SignUpRequest } from "./types/interfaces";
import { SignUpNewUser } from "./functions/NewUser";
import jwt from "jsonwebtoken";
import cors from "cors";
import { authenticateToken } from "./middleware/authenticateToken";
import { LoginUser } from "./functions/Login";
import { GetUserInfo } from "./functions/GetUserInfo";

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = 3001;

app.get("/testAuth", authenticateToken, (req: Request, res: Response) => {
  res.send("Authenticated as " + req.user);
});

app.get("/getUserInfo", authenticateToken, async (req: Request, res: Response) => {
  const user = req.user as string;
  const userInfo = await GetUserInfo(user);
  res.json(userInfo);
});

app.post(
  "/login",
  async (
    req: Request<unknown, unknown, LoginRequest, unknown>,
    res: Response
  ) => {
    try {
      const response = await LoginUser(req.body.username, req.body.password);
      if (response == 200) {
        //TODO: Might need to return more than just a username
        const token = jwt.sign(req.body.username, "memes");
        res.json(token);
      } else {
        res.sendStatus(response);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  }
);

app.post(
  "/signup",
  async (
    req: Request<unknown, unknown, SignUpRequest, unknown>,
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
