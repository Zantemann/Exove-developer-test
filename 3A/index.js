import { dbConnection, closeConnection, createTables } from './sql.js';
import productsData from './products.json' assert { type: 'json' };

// Initializing database by creating tables and adding items from API 
const initializeDatabase = () => {
  dbConnection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL:', error.stack);
      return;
    }
    console.log('Connected to MySQL', dbConnection.threadId);

    // Creating databases if needed
    createTables();

    // Insert data into tables
    productsData.products.forEach((product) => {
      dbConnection.query(
        'INSERT INTO products (id, name, description) VALUES (?, ?, ?)',
        [product.id, product.name, product.description],
        (error) => {
          if (error) {
            console.error('Error inserting product:', error);
          }
        }
      );

      product.categories.forEach((category) => {
        dbConnection.query(
          'INSERT INTO categories (product_id, category_id, category_name) VALUES (?, ?, ?)',
          [product.id, category.id, category.name],
          (error) => {
            if (error) {
              console.error('Error inserting category:', error);
            }
          }
        );
      });

      product.variations.forEach((variation) => {
        dbConnection.query(
          'INSERT INTO variations (product_id, size, price, paper_size) VALUES (?, ?, ?, ?)',
          [product.id, variation.size, variation.price, variation['paper size']],
          (error) => {
            if (error) {
              console.error('Error inserting variation:', error);
            }
          }
        );
      });
    });

    // Closing the database connection
    closeConnection();
  });
};

initializeDatabase();