import { ResultSetHeader } from "mysql2/promise";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Solution= {
  id: number;
  id_user: number;
  id_course: number;
  corpus_solution: string;
  isValidated : boolean;
}

class SolutionRepository {
  // The C of CRUD - Create operation

  async create(Solution: Omit<Solution, "id">) {
    // Execute the SQL INSERT query to add a new Solution to the "Solution" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO solution (id_user, id_course, corpus_solution) VALUES(?,?,?)",
      [Solution.id_user, Solution.id_course, Solution.corpus_solution
      ],
    );

    // Return the ID of the newly inserted Solution
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific Solution by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from Solution where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the Solution
    return rows[0] as Solution;
  }

  async readByCourse(id: number) {
    // Execute the SQL SELECT query to retrieve a list of Solution given to a course
    const [rows] = await databaseClient.query<Rows>(
      "SELECT s.id,s.id_user,c.title,s.corpus_solution FROM solution s JOIN course c ON s.id_course = c.id WHERE c.id = ?",
      [id],
    );

    // Return the first row of the result, which represents the Solution
    return rows as Solution[];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Solutions from the "Solution" table
    const [rows] = await databaseClient.query<Rows>("select * from Solution");

    // Return the array of Solutions
    return rows as Solution[];
  }
  // The U of CRUD - Update operation
  async update(Solution: Solution): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE Solution SET corpus_solution = ? WHERE id = ?",
      [
        Solution.corpus_solution,
        Solution.id,
      ],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Solution by its ID
  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM Solution WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new SolutionRepository();
