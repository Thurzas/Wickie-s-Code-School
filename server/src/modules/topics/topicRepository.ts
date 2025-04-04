import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export type Topic = {
  id: number;
  name: string;
  image: string;
};

class TopicRepository {
  // The C of CRUD - Create operation

  async create(topic: Omit<Topic, "id">) {
    // Execute the SQL INSERT query to add a new Topic to the "Topic" table
    const [result] = await databaseClient.query<Result>(
      "insert into topic (name, image) values (?, ?)",
      [topic.name, topic.image],
    );

    // Return the ID of the newly inserted Topic
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific Topic by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from topic where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the Topic
    return rows[0] as Topic;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Topics from the "Topic" table
    const [rows] = await databaseClient.query<Rows>("select * from topic");

    // Return the array of Topics
    return rows as Topic[];
  }

  // The U of CRUD - Update operation
  async update(topic: Topic): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE topic SET name = ?, image = ? WHERE id = ?",
      [topic.name, topic.image, topic.id],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Topic by its ID
  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM Topic WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new TopicRepository();
