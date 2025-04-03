import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  pseudo: string;
  image: string;
  age?: number;
  privillege: "aspirant" | "viking" | "jaarl" | "thor" | "odin";
  level: number;
  xp: number;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(User: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new User to the "User" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname,pseudo, image, age, privillege, level, xp) VALUES(?,?,?,?,?,?,?)",
      [
        User.firstname,
        User.lastname,
        User.pseudo,
        User.image,
        User.age,
        User.privillege,
        User.level,
        User.xp,
      ],
    );

    // Return the ID of the newly inserted User
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific User by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from User where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the User
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Users from the "User" table
    const [rows] = await databaseClient.query<Rows>("select * from User");

    // Return the array of Users
    return rows as User[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing User

  // async update(User: User) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an User by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new UserRepository();
