import type { ResultSetHeader } from "mysql2/promise";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Course = {
  id: number;
  title: string;
  corpus: string;
  is_active: number;
  id_category: number;
  topic_id: number;
};

class CourseRepository {
  // The C of CRUD - Create operation

  async create(Course: Omit<Course, "id">) {
    // Execute the SQL INSERT query to add a new Course to the "Course" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO course (id_category, title, corpus, is_active, topic_id) VALUES(?,?,?,?,?)",
      [
        Course.id_category,
        Course.title,
        Course.corpus,
        Course.is_active,
        Course.topic_id,
      ],
    );

    // Return the ID of the newly inserted Course
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific Course by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from Course where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the Course
    return rows[0] as Course;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Courses from the "Course" table
    const [rows] = await databaseClient.query<Rows>("select * from Course");

    // Return the array of Courses
    return rows as Course[];
  }

  // The U of CRUD - Update operation
  async update(Course: Course): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE Course SET title = ?, corpus = ?, id_category = ?, topic_id = ? WHERE id = ?",
      [
        Course.title,
        Course.corpus,
        Course.id_category,
        Course.topic_id,
        Course.id,
      ],
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Course by its ID
  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM Course WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CourseRepository();
