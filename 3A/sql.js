import mysql from 'mysql';
import config from './config.js';

console.log('Database host:', config.MYSQL_HOST);
console.log('Database user:', config.MYSQL_USERNAME);
console.log('Database password:', config.MYSQL_PASSWORD);
console.log('Database name:', config.MYSQL_DATABASE_NAME);

const dbConnection = mysql.createConnection({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE_NAME
});

const closeConnection = () => {
  dbConnection.end((error) => {
    if (error) {
      console.error('Error closing connection:', error.message);
    } else {
      console.log('Connection closed successfully.');
    }
  });
};

const createTables = () => {
  const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255),
      description TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS categories (
      product_id VARCHAR(36),
      category_id VARCHAR(36),
      category_name VARCHAR(255),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`,
    `CREATE TABLE IF NOT EXISTS variations (
      product_id VARCHAR(36),
      size VARCHAR(10),
      price DECIMAL(10, 3),
      paper_size VARCHAR(10),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`
  ];

  createTablesQueries.forEach((query) => {
    dbConnection.query(query, (error) => {
      if (error) {
        console.error('Error creating table:', error);
      }
    });
  });
};

export { dbConnection, closeConnection, createTables };