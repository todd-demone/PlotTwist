const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  //////////////////////////
  //////GET REQUESTS////////
  //////////////////////////

  // GET ALL STORIES
  router.get("/", (req, res) => {
    const limit = 10;
    const queryString = `
      SELECT *
      FROM stories
      ORDER BY id DESC
      LIMIT $1;
    `;
    const queryParams = [limit];
    db.query(queryString, queryParams)
      .then(data => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET STORY
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const queryString = `
      SELECT * 
      FROM stories 
      WHERE id = $1;
    `;
    const queryParams = [id];
    db.query(queryString, queryParams)
      .then(data => {
        const story = data.rows[0];
        res.json({ story });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET AUTHOR'S STORIES
  router.get("/author/:author_id", (req, res) => {
    const { author_id } = req.params;
    const queryString = `
      SELECT * 
      FROM stories
      WHERE author_id = $1
      ORDER BY id DESC;
    `;
    const queryParams = [author_id];
    db.query(queryString, queryParams)
      .then(data => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  ///////////////////////////
  ////POST & PUT REQUESTS////
  ///////////////////////////

  // POST STORY
  router.post("/", (req, res) => {
    const author_id = req.session.user_id;
    const { title, text } = req.body;
    const queryString = `
      INSERT INTO stories
      (author_id, title, text)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const queryParams = [author_id, title, text];
    db.query(queryString, queryParams)  
    .then(data => { 
      const story = data.rows[0];
      // want to send back a story object so front end can render a new story page
      res.json({ story });
    }) 
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  // MARK STORY COMPLETED
  router.put("/:id/completed", (req, res) => {
    const { id } = req.params;
    // check if author has permission to edit story title
    const author_id = req.session.user_id;
    const queryString = `
      UPDATE stories 
      SET completed = true 
      WHERE id = $1
      AND author_id = $2
      RETURNING *;
    `;
    const queryParams = [id, author_id];
    db.query(queryString, queryParams)
      .then(data => {
        res
          .status(200)
          .send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });      
  });

  // "DELETE" STORY
  router.put("/:id/delete", (req, res) => {
    const { id } = req.params;
    const author_id = req.session.user_id;
    const queryString = `
      UPDATE stories
      SET text='[Deleted]'
      WHERE id = $1
      AND author_id = $2 
      RETURNING *;
    `;
    const queryParams = [id, author_id];
    db.query(queryString, queryParams)
      .then(data => {
        res
          .status(200)
          .send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // EDIT STORY
  router.put("/:id", (req, res) => {
    const { title, text } = req.body;
    const { id } = req.params;
    const author_id = req.session.user_id;
    const queryString = `
      UPDATE stories
      SET title = $1, text = $2
      WHERE id = $3 
      AND author_id = $4
      RETURNING *;
    `;
    const queryParams = [title, text, id, author_id];
    db.query(queryString, queryParams)
      .then(data => {
        res
          .status(200)
          .send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};