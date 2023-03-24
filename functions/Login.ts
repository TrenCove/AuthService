import crypto from "crypto";
import sqlite3 from "sqlite3";
import { UserDbRow } from "../types/interfaces";

const db = new sqlite3.Database("./db/users.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected to the users database.");
});

/**
 * This allows an existing user to log into the system
 * 
 * @param username - username of the user
 * @param password - password of the user
 * 
 * @returns a status depending on if the user exists in the system or not
 */
export async function LoginUser(
  username: string,
  password: string,
): Promise<number> {
  const hashedPassword = crypto
    .createHmac("sha256", "memes")
    .update(password)
    .digest("hex");

  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username=?",
      [username],
      (error, row: UserDbRow) => {
        if (error) {
          console.log(error);
          return reject(400);
        }
        if(row && row.password == hashedPassword){
            console.log("success");
            return resolve(200);
        }else{
            console.log("Error logging in");
            return resolve(401);
        }
      }
    );
  });
}
