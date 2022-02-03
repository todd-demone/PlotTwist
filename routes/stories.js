const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  // GET STORIES

  
  // GET STORY 

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
      const story = data.rows[0];
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
    // check if user has permission to edit story title
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