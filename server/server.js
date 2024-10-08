const express = require('express');
const app = express();
const db = require('./db');
const cors = require("cors");
const multer = require("multer");
const upload = multer({dest: "uploads"});
const PORT = 3001;

const fileConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})


app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());
//app.use(multer({storage:fileConfig}).single('filedata'));

app.get('/news', async(req, res) => {
  const news = await db.query(`SELECT * FROM news`);
  res.send(news.rows);
});

app.get('/news/:id', async(req, res) => {
  const {id} = req.params;
  const getIDNews = await db.query('select * from news where id = $1', [id]);
  res.send(getIDNews.rows);
});

app.get('/newslast', async(req, res) => {
  const getLastNews = await db.query('SELECT * FROM news ORDER BY id DESC LIMIT 6');
  res.send(getLastNews.rows);
});

app.get('/archive', async(req, res) => {
  const archiveNews = await db.query(
    'SELECT * FROM news WHERE id NOT IN ( SELECT id FROM news ORDER BY id DESC LIMIT 6) ORDER BY id;');
  res.send(archiveNews.rows);
})

app.post('/news', multer({storage:fileConfig}).single('filedata'), async(req, res) => {
  const {title, full_text} = req.body;
  let fileData = req.file;
  if(title.length === 0 || full_text.length === 0) {
    return res.status(400).send("пустые поля");
  }
  const createNewPost = await db.query(`insert into news(title, full_text, img) values($1, $2, $3) RETURNING *`, [title, full_text, fileData.originalname]);
  res.status(201).send(createNewPost.rows);
});

app.delete('/news/:id', async(req, res) => {
  const {id} = req.params;
  const delPost = await db.query(`delete from news where id = $1`, [id]);
  res.send('delete post');
});

app.put("/news/:id", multer({storage:fileConfig}).single('filedata'), async(req, res) => {
  const {id} = req.params;
  const {title, full_text} = req.body;
  let fileData = req.file;
  const getUpdatePost = await db.query('update news set title = $1, full_text = $2, img = $3 where id = $4', [title, full_text, fileData.originalname, id]);
  console.log('put method');
  console.log(req.body);
  res.send('update post');
});




app.listen(PORT, () => console.log(`start:${PORT}`))
