// // // // const express = require('express');
// // // // const cors = require('cors');
// // // // const multer = require('multer');
// // // // const path = require('path');

// // // // const app = express();
// // // // const PORT = 5000;

// // // // // Enable CORS for all origins
// // // // app.use(cors());

// // // // // Serve static folder to access uploaded images
// // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // Multer storage config
// // // // const storage = multer.diskStorage({
// // // //   destination: (req, file, cb) => cb(null, './uploads'),
// // // //   filename: (req, file, cb) => {
// // // //     const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '');
// // // //     cb(null, uniqueName);
// // // //   }
// // // // });

// // // // const upload = multer({ 
// // // //   storage,
// // // //   fileFilter: (req, file, cb) => {
// // // //     // Only accept image files
// // // //     const ext = path.extname(file.originalname).toLowerCase();
// // // //     if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
// // // //       cb(null, true);
// // // //     } else {
// // // //       cb(new Error('Only .jpg, .jpeg, .png files are allowed'));
// // // //     }
// // // //   }
// // // // });

// // // // // Route to handle contact form submission
// // // // app.post('/api/contacts', upload.single('image'), (req, res) => {
// // // //   try {
// // // //     // Validate phone starts with +91 and length 13 chars
// // // //     const phone = req.body.phone;
// // // //     if (!phone || !phone.match(/^\+91[1-9][0-9]{9}$/)) {
// // // //       return res.status(400).json({ error: 'Invalid phone number format. Must start with +91 and be 13 characters.' });
// // // //     }
// // // //     // Validate no '00' in phone
// // // //     if (phone.includes('00')) {
// // // //       return res.status(400).json({ error: 'Phone number cannot contain "00".' });
// // // //     }

// // // //     // Validate title, firstName, lastName length <= 50
// // // //     if ([req.body.title, req.body.firstName, req.body.lastName].some(field => field.length > 50)) {
// // // //       return res.status(400).json({ error: 'Title, First Name, Last Name cannot exceed 50 characters.' });
// // // //     }

// // // //     // Validate birthday format dd/mm/yyyy
// // // //     if (!req.body.birthday || !req.body.birthday.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
// // // //       return res.status(400).json({ error: 'Birthday must be in dd/mm/yyyy format.' });
// // // //     }

// // // //     if (!req.file) {
// // // //       return res.status(400).json({ error: 'Passport size photo (image) is required.' });
// // // //     }

// // // //     // Here you would save contact data + image filename to your database
// // // //     // For demo, we just return success with the saved data

// // // //     const response = {
// // // //       title: req.body.title,
// // // //       firstName: req.body.firstName,
// // // //       lastName: req.body.lastName,
// // // //       phone: req.body.phone,
// // // //       email: req.body.email,
// // // //       birthday: req.body.birthday,
// // // //       imageUrl: `/uploads/${req.file.filename}`
// // // //     };

// // // //     res.json({ message: 'Contact saved successfully', contact: response });

// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // });

// // // // app.listen(PORT, () => {
// // // //   console.log(`Server running on http://localhost:${PORT}`);
// // // // });




// // // const express = require('express');
// // // const cors = require('cors');
// // // const multer = require('multer');
// // // const mysql = require('mysql2');
// // // const path = require('path');
// // // const app = express();

// // // app.use(cors());
// // // app.use(express.json());
// // // app.use('/uploads', express.static('uploads'));

// // // const db = mysql.createConnection({
// // //   host: 'localhost',
// // //   user: 'root',
// // //   password: 'sanjay23',
// // //   database: 'contact_app'
// // // });

// // // db.connect(err => {
// // //   if (err) throw err;
// // //   console.log('MySQL Connected');
// // // });

// // // const storage = multer.diskStorage({
// // //   destination: 'uploads/',
// // //   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// // // });
// // // const upload = multer({ storage });

// // // app.get('/users', (req, res) => {
// // //   db.query('SELECT * FROM users', (err, result) => {
// // //     if (err) throw err;
// // //     res.json(result);
// // //   });
// // // });

// // // app.post('/users', upload.single('photo'), (req, res) => {
// // //   const { email, first_name, last_name, contact, birthdate, address } = req.body;
// // //   const photo = req.file.filename;

// // //   const query = 'INSERT INTO users (email, first_name, last_name, contact, birthdate, photo, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
// // //   db.query(query, [email, first_name, last_name, contact, birthdate, photo, address], (err) => {
// // //     if (err) throw err;
// // //     res.json({ message: 'User added' });
// // //   });
// // // });

// // // app.listen(5000, () => console.log('Server running on port 5000'));



// // // // DATABASE - MySQL
// // // // Run these queries in MySQL CLI or GUI
// // // /*
// // // CREATE DATABASE contact_app;
// // // USE contact_app;
// // // CREATE TABLE users (
// // //   id INT AUTO_INCREMENT PRIMARY KEY,
// // //   email VARCHAR(255),
// // //   first_name VARCHAR(100),
// // //   last_name VARCHAR(100),
// // //   contact VARCHAR(13),
// // //   birthdate DATE,
// // //   photo VARCHAR(255),
// // //   address TEXT
// // // );
// // // */


// // const express = require('express');
// // const cors = require('cors');
// // const multer = require('multer');
// // const mysql = require('mysql2');
// // const path = require('path');
// // const app = express();

// // app.use(cors());
// // app.use(express.json());
// // app.use('/uploads', express.static('uploads'));

// // const db = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: '',
// //   database: 'contact_app'
// // });

// // db.connect(err => {
// //   if (err) throw err;
// //   console.log('MySQL Connected');
// // });

// // const storage = multer.diskStorage({
// //   destination: 'uploads/',
// //   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// // });
// // const upload = multer({ storage });

// // app.get('/users', (req, res) => {
// //   db.query('SELECT * FROM users', (err, result) => {
// //     if (err) throw err;
// //     res.json(result);
// //   });
// // });

// // app.post('/users', upload.single('photo'), (req, res) => {
// //   const { email, first_name, last_name, contact, birthdate, address } = req.body;
// //   const photo = req.file.filename;

// //   const query = 'INSERT INTO users (email, first_name, last_name, contact, birthdate, photo, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
// //   db.query(query, [email, first_name, last_name, contact, birthdate, photo, address], (err) => {
// //     if (err) throw err;
// //     res.json({ message: 'User added' });
// //   });
// // });

// // // Update user by ID
// // app.put('/users/:id', upload.single('photo'), (req, res) => {
// //   const { email, first_name, last_name, contact, birthdate, address } = req.body;
// //   const { id } = req.params;

// //   const photo = req.file ? req.file.filename : null;

// //   let query = `UPDATE users SET email=?, first_name=?, last_name=?, contact=?, birthdate=?, address=?`;
// //   const values = [email, first_name, last_name, contact, birthdate, address];

// //   if (photo) {
// //     query += `, photo=?`;
// //     values.push(photo);
// //   }

// //   query += ` WHERE id=?`;
// //   values.push(id);

// //   db.query(query, values, (err) => {
// //     if (err) throw err;
// //     res.json({ message: 'User updated' });
// //   });
// // });

// // // Delete user by ID
// // app.delete('/users/:id', (req, res) => {
// //   const { id } = req.params;

// //   db.query('DELETE FROM users WHERE id=?', [id], (err) => {
// //     if (err) throw err;
// //     res.json({ message: 'User deleted' });
// //   });
// // });


// // app.listen(5000, () => console.log('Server running on port 5000'));




// // server.js
// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const mysql = require('mysql2');
// const path = require('path');
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'contact_app',
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('MySQL Connected');
// });

// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// app.get('/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// app.post('/users', upload.single('photo'), (req, res) => {
//   const { email, first_name, last_name, contact, birthdate, address } = req.body;
//   const photo = req.file.filename;

//   const query = 'INSERT INTO users (email, first_name, last_name, contact, birthdate, photo, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
//   db.query(query, [email, first_name, last_name, contact, birthdate, photo, address], (err) => {
//     if (err) throw err;
//     res.json({ message: 'User added' });
//   });
// });

// app.put('/users/:id', upload.single('photo'), (req, res) => {
//   const { id } = req.params;
//   const { email, first_name, last_name, contact, birthdate, address } = req.body;
//   const photo = req.file ? req.file.filename : null;

//   let query = `UPDATE users SET email=?, first_name=?, last_name=?, contact=?, birthdate=?, address=?`;
//   const values = [email, first_name, last_name, contact, birthdate, address];

//   if (photo) {
//     query += `, photo=?`;
//     values.push(photo);
//   }

//   query += ` WHERE id=?`;
//   values.push(id);

//   db.query(query, values, (err) => {
//     if (err) throw err;
//     res.json({ message: 'User updated' });
//   });
// });

// app.delete('/users/:id', (req, res) => {
//   const { id } = req.params;
//   db.query('DELETE FROM users WHERE id=?', [id], (err) => {
//     if (err) throw err;
//     res.json({ message: 'User deleted' });
//   });
// });

// app.listen(5000, () => console.log('Server running on http://localhost:5000'));


// ==== BACKEND (server.js) ====

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sanjay23',
  database: 'contact_app'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post('/users', upload.single('photo'), (req, res) => {
  const { email, first_name, last_name, contact, birthdate, address } = req.body;
  const photo = req.file ? req.file.filename : null;

  db.query(
    'INSERT INTO users (email, first_name, last_name, contact, birthdate, photo, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [email, first_name, last_name, contact, birthdate, photo, address],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'User added successfully' });
    }
  );
});

app.put('/users/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name, contact, birthdate, address } = req.body;
  const photo = req.file ? req.file.filename : null;

  const updateQuery = photo
    ? 'UPDATE users SET email=?, first_name=?, last_name=?, contact=?, birthdate=?, photo=?, address=? WHERE id=?'
    : 'UPDATE users SET email=?, first_name=?, last_name=?, contact=?, birthdate=?, address=? WHERE id=?';

  const values = photo
    ? [email, first_name, last_name, contact, birthdate, photo, address, id]
    : [email, first_name, last_name, contact, birthdate, address, id];

  db.query(updateQuery, values, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User updated successfully' });
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User deleted successfully' });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
