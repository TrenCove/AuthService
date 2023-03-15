import express, { Express, Request, Response } from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import crypto from "crypto";

const db = new sqlite3.Database("./db/users.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected to the users database.");
});

interface LoginRequest {
  username: string;
  password: string;
}

const app: Express = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  db.all("SELECT * from users", [], (error, rows) => {
    if (error) {
      console.log(error);
      throw error;
    }
    rows.forEach((row) => {
      console.log(row);
    });
    res.status(200).json(rows);
  });
  //res.send("Auth Service Running");
});

app.post("/login", (req: Request, res: Response) => {
  //TODO
});

app.post(
  "/signup",
  (req: Request<unknown, unknown, LoginRequest, unknown>, res: Response) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = crypto
      .createHmac("sha256", "memes")
      .update(password)
      .digest("hex");
    db.run(
      "INSERT INTO users (username,password,name,address) VALUES ($1,$2,$3,$4) RETURNING *",
      [username, hashedPassword, "testname", "testaddress"],
      (error) => {
        if (error) {
          console.log(error);
          throw error;
        }
        res.status(200).json("Success");
      }
    );
  }
);

app.listen(port, () => {
  console.log(`Auth Service is running at http://localhost:${port}`);
});
