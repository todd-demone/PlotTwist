const express = require('express');
const router = express.Router();

module.exports = (db) => {

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

  // GET USER'S STORIES
  router.get("/user/:user_id", (req, res) => {
    const { user_id } = req.params;
    const queryString = `
      SELECT * 
      FROM stories
      WHERE user_id = $1
      ORDER BY id DESC;
    `;
    const queryParams = [user_id];
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
  
  // POST STORY
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { title, text } = req.body;
    const queryString = `
      INSERT INTO stories
      (user_id, title, text)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const queryParams = [user_id, title, text];
    db.query(queryString, queryParams)  
    .then(data => { 
      res
      .status(201)
      .send();
    }) 
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  // EDIT STORY
  router.put("/:id/edit", (req, res) => {
    const { title, text } = req.body;
    const { id } = req.params;
    const { user_id } = req.session;
    const queryString = `
      UPDATE stories
      SET title = $1, text = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *;
    `;
    const queryParams = [title, text, id, user_id];
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
    const { user_id } = req.session;
    const queryString = `
      UPDATE stories
      SET completed = true
      WHERE id = $1 AND user_id = $2 
      RETURNING *;
    `;
    const queryParams = [id, user_id];
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

  // MARK STORY COMPLETED
  router.put("/:id/completed", (req, res) => {
    // check if user has permission to edit story title
    const { id } = req.params;
    const { user_id } = req.session;
    const queryString = `
      UPDATE stories 
      SET completed = true 
      WHERE id = $1 and user_id = $2
      RETURNING *;
    `;
    const queryParams = [id, user_id];
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