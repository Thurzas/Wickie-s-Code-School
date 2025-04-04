import type { ResultSetHeader } from "mysql2/promise";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export type Course = {
  id: number;
  title: string;
  corpus: string;
  is_active: boolean; // Vérifie bien ce type
  id_category: number;
  topic_id: number;
};

export type CourseJoin = {
  id: number;
  title: string;
  image: string;
  corpus: string;
  is_active: boolean;
  type: string;
  topic: string;
  reward: number;
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
      "SELECT c.id, id_category, topic_id, ca.name as `type`, c.title, c.corpus, c.is_active, t.name as `topic`, t.image as `image`, c.reward FROM course c JOIN category ca ON c.id_category = ca.id JOIN topic t ON t.id = c.topic_id WHERE c.id = ?",
      [id],
    );

    // Return the first row of the result, which represents the Course
    return rows[0] as CourseJoin;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Courses from the "Course" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT c.id, id_category, topic_id, ca.name as `type`, c.title, c.corpus, c.is_active, t.name as `topic`, t.image as `image`, c.reward FROM course c JOIN category ca ON c.id_category = ca.id JOIN topic t ON t.id = c.topic_id",
    );

    // Return the array of Courses
    return rows as CourseJoin[];
  }

  // The U of CRUD - Update operation
  async update(Course: Course): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE course SET title = ?, corpus = ?, id_category = ?, topic_id = ?, is_active = ? WHERE id = ?",
      [
        Course.title,
        Course.corpus,
        Course.id_category,
        Course.topic_id,
        Course.is_active,
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
