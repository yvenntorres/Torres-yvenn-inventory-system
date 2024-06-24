import express from 'express';
import cors from 'cors';
import { checkConnection } from './db_config.js' ;

const app = express();
const PORT = 5000;

const connection = checkConnection();

app.use(cors({credentials: true, origin:["http://localhost:5173"]}));
app.use(express.json());

// Define the index route
app.get('/', (req, res) => {
  res.send(`The server is running on PORT ${PORT}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.get('/users/check-user', (req, res) => {
  res.send('hello get');
});

// Route for '/users/check-user'
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE username=? and password=? LIMIT 1';

  connection.query(query, [username, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error'});
    }
    
    if (results.length > 0) {
      res.json(true)
    } else {
      res.json(false);
    }
  });
});



app.get('/user/get-all', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error'});
      return;
    }
    res.json(results);
  });
});

// Route for '/products/get-all'
app.get('/products/get-all', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error'});
      return;
    }
    res.json(results);
  });
});


app.post('/products/update-by-id/:product_id', (req, res) => {
  const { product_id } = req.params;
  const { product_name, quantity, unit, price } = req.body;

  const query = 'UPDATE products SET product_name = ?, quantity = ?, unit = ?, price = ? WHERE product_id = ?';
  
  connection.query(query, [product_name, quantity, unit, price, product_id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.affectedRows > 0) {
      res.json({ success: true }); // Return true if the update was successful
    } else {
      res.json({ success: false }); // Return false if no rows were updated
    }
  });
});



// Route for "/products/get-by-id"
app.get('/products/get-by-id/:product_id', (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT * FROM products WHERE product_id = ?';
  
  connection.query(query, [product_id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(results[0]);
  });
});


app.post('/products/delete-by-id', (req, res) => {
  const { product_id } = req.body;

  const query = 'DELETE FROM products WHERE product_id = ?';
  
  connection.query(query, [ product_id ], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error'});
      return;
    }
    if (results.affectedRows ) {
      res.json(true); // Return true if the delete operation was successful
    } else {
      res.json(false); // Return false if no rows were deleted
    }
  });
});


// to add products
app.post('/products/add-product', (req, res) => {
  const { product_id, product_name, quantity, unit, price} = req.body;

  try {
    const sel = 'SELECT * FROM products WHERE product_id =? OR product_name =?';
    connection.query(sel, [ product_id, product_name ], (error, results, fields) => {

    if (results.length > 0) {
      res.json({exist: true, success: false});
      return;
    }
  });
    const query = 'INSERT INTO products (product_name, quantity, unit, price, product_id) VALUES (?,?,?,?,?)';
    connection.query(query, [ product_name, quantity, unit, price, product_id ], (error, results, fields) => {
      res.json({exist: false, success: true }); 
    });

  } catch (error) {
    console.error('Error executing query:', error);
    res.json({exist: false, success: false });
  }
});