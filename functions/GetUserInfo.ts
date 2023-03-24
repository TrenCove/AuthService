import sqlite3 from "sqlite3";
import { UserInfo } from "../types/interfaces";

const db = new sqlite3.Database("./db/users.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected to the users database.");
});


export async function GetUserInfo(username: string): Promise<UserInfo | undefined> {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT name, address FROM users WHERE username=?",
        [username],
        (error, row: UserInfo) => {
          if (error) {
            console.log(error);
            return reject(400);
          }
          if(row){
              console.log("success");
              return resolve(row);
          }else{
              console.log("Error logging in");
              return resolve(undefined);
          }
        }
      );
    });
  }