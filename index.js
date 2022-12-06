const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const database = require('./db.js');
const multer = require('multer');
const usersRoutes = require('./router/user');
const blogRoutes = require('./router/blog');
const contactRoutes = require('./router/contact');
require('dotenv').config();
// url path set 
app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.json());
app.use("/api/user", usersRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use('/images', express.static('images'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      message: err.message
    })
  }
}
app.use(errHandler)

app.listen(port, () => {
  console.log(`\n Server is Running http://localhost:${port}`)
})