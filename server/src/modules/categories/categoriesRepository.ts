import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export type Category = {
  id: number;
  name: string;
};

class categoryRepository {
  // The C of CRUD - Create operation

  async create(category: Omit<Category, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into category (name) values (?)",
      [category.name],
    );

    // Return the ID of the newly inserted category
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from category where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the category
    return rows[0] as Category;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categorys from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categorys
    return rows as Category[];
  }

  // The U of CRUD - Update operation
  async update(category: Category): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE category SET name = ? WHERE id = ?",
      [category.name, category.id],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an category by its ID
  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM category WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new categoryRepository();
