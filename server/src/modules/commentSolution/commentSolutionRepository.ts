import type { ResultSetHeader } from "mysql2/promise";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type CommentSolution = {
  id: number;
  id_user: number;
  id_user_target: number;
  id_solution: number;
  text_comment_solution: string;
  isValidated: boolean;
};

class CommentSolutionRepository {
  // The C of CRUD - Create operation

  async create(CommentSolution: Omit<CommentSolution, "id">) {
    // Execute the SQL INSERT query to add a new CommentSolution to the "CommentSolution" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO CommentSolution (id_user, id_user_target, id_course, corpus_CommentSolution) VALUES(?,?,?)",
      [
        CommentSolution.id_user,
        CommentSolution.id_solution,
        CommentSolution.text_comment_solution,
      ],
    );

    // Return the ID of the newly inserted CommentSolution
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific CommentSolution by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from comment_solution where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the CommentSolution
    return rows[0] as CommentSolution;
  }

  async readBySolution(id: number) {
    // Execute the SQL SELECT query to retrieve a list of CommentSolution given to a course
    const [rows] = await databaseClient.query<Rows>(
      "SELECT transmitter.pseudo as `transmitter`, receiver.pseudo as `receiver`, cs.text_comment_solution, cs.isValidated from comment_solution cs JOIN user transmitter ON transmitter.id = cs.id_user JOIN user receiver ON receiver.id = cs.id_user_target WHERE cs.id_solution = ?",
      [id],
    );

    // Return the first row of the result, which represents the CommentSolution
    return rows as CommentSolution[];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all CommentSolutions from the "CommentSolution" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from comment_solution",
    );

    // Return the array of CommentSolutions
    return rows as CommentSolution[];
  }
  // The U of CRUD - Update operation
  async update(CommentSolution: CommentSolution): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE comment_solution SET text_comment_solution = ? WHERE id = ?",
      [CommentSolution.text_comment_solution, CommentSolution.id],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an CommentSolution by its ID
  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM comment_solution WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CommentSolutionRepository();
