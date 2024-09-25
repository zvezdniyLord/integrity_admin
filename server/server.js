const express = require('express');
const app = express();
const db = require('./db');
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const PORT = 3001;


app.use(cors());
app.use(express.json());

app.get('/news', async(req, res) => {
  const news = await db.query(`SELECT * FROM news`);
  res.send(news.rows);
});

app.get('/news/:id', async(req, res) => {
  const {id} = req.params;
  const getIDNews = await db.query('select * from news where id = $1', [id]);
  res.send(getIDNews.rows);
})

app.post('/news', upload.none(), async(req, res) => {
  const {title, full_text, img} = req.body;
  console.log(req.body);
  const createNewPost = await db.query(`insert into news(title, full_text, img) values($1, $2, $3) RETURNING *`, [title, full_text, img]);
  res.status(201).send(createNewPost.rows);
});

app.delete('/news/:id', async(req, res) => {
  const {id} = req.params;
  const delPost = await db.query(`delete from news where id = $1`, [id]);
  res.send('delete post');
});

app.put("/news/:id", async(req, res) => {
  const {id} = req.params;
  const {title, full_text, img} = req.body;
  const getUpdatePost = await db.query('update news set title = $1, full_text = $2, img = $3 where id = $4', [title, full_text, img, id]);
  res.send('update post');
})

app.listen(PORT, () => console.log(`start:${PORT}`))
