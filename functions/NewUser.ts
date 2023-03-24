import crypto from "crypto";
import sqlite3 from "sqlite3";
import { Name, Address } from "../types/interfaces";

const db = new sqlite3.Database("./db/users.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected to the users database.");
});

/**
 * This allows new users to sign up the the system, they are stored in the users database
 * 
 * @param username - the users username
 * @param password - the users password
 * @param name - the users name
 * @param address - an interface that contains multiple address information
 * 
 * @returns a success or fail code depending on if the sign up was successful
 */
export async function SignUpNewUser(
  username: string,
  password: string,
  name: Name,
  address: Address
): Promise<number> {
  const hashedPassword = crypto
    .createHmac("sha256", "memes")
    .update(password)
    .digest("hex");

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (username,password,name,address) VALUES ($1,$2,$3,$4)",
      [username, hashedPassword, JSON.stringify(name), JSON.stringify(address)],
      (error) => {
        if (error) {
          console.log(error);
          return reject(400);
        }
        console.log("success");
        return resolve(200);
      }
    );
  });
}
