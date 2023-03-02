import { pool } from "../database/database.js";
class BaseModel {
  constructor(table, primaryKey) {
    this.table = table;
    this.primaryKey = primaryKey;
  }

  async create(data) {
    const client = await pool.connect();
    const keys = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = Object.keys(data)
      .map((_, i) => `$${i + 1}`)
      .join(", ");
    const query = {
      text: `INSERT INTO ${this.table} (${keys}) VALUES (${placeholders}) RETURNING *;`,
      values,
    };

    const result = await client.query(query);
    client.release();
    return result.rows[0];
  }

  async findAll({
    where = {},
    orderBy = "",
    offset = 0,
    limit = 0,
    include = {},
  } = {}) {
    const client = await pool.connect();
    const keys = Object.keys(where);
    const values = Object.values(where);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(" AND ");

    let query = {
      text: `SELECT ${this.table}.*, ${include.select || ""} FROM ${
        this.table
      }`,
    };
    if (include.table && include.foreignKey) {
      query.text += ` INNER JOIN ${include.table} ON ${this.table}.${include.foreignKey} = ${include.table}.id`;
    }
    if (keys.length > 0) {
      query.text += ` WHERE ${keys
        .map((k, i) => `${this.table}.${k} = ${placeholders.split(" AND ")[i]}`)
        .join(" AND ")}`;
      query.values = values;
    }
    if (orderBy) {
      query.text += ` ORDER BY ${orderBy}`;
    }
    if (offset) {
      query.text += ` OFFSET ${offset}`;
    }
    if (limit) {
      query.text += ` LIMIT ${limit}`;
    }

    const result = await client.query(query);
    client.release();
    return result.rows[0];
  }

  async deleteByPK(pk) {
    const client = await pool.connect();
    const query = {
      text: `DELETE FROM ${this.table} WHERE ${this.primaryKey} = $1 RETURNING *;`,
      values: [pk],
    };

    const result = await client.query(query);
    client.release();
    return result.rows[0];
  }

  async findByPK(pk) {
    const client = await pool.connect();
    const query = {
      text: `SELECT * FROM ${this.table} WHERE ${this.primaryKey} = $1;`,
      values: [pk],
    };

    const result = await client.query(query);
    client.release();
    return result.rows[0];
  }
  objectCopy() {
    const newObj = {};
    for (const [key, value] of Object.entries(this)) {
      newObj[key] = value;
    }
    return newObj;
  }
}

export default BaseModel;
