const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // GET all stories
  router.get("/", (req, res) => {
    const limit = 10;
    const queryString = `
      SELECT *
      FROM stories
      ORDER BY id ASC
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

  // GET a story
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

  // POST a story
  router.post("/", (req, res) => {
    const { creator_id } = req.session.user_id;
    const { title, text } = req.body;
    let queryString = `
      INSERT INTO stories
      (creator_id, title)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    let queryParams = [creator_id, title, text];
    
    const story = db.query(queryString, queryParams).then(data => data.rows[0]);

    queryString = `
      INSERT INTO contributions
      (user_id, story_id, parent_id, working_level, text)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const user_id = story.creator_id;
    const story_id = story.id;
    const parent_id = null;
    const working_level = 0;
    queryParams = [user_id, story_id, parent_id, working_level, text];
    
    db.query(queryString, queryParams)  
      .then(data => {
        const contribution = data.rows[0];
        res.redirect(`/api/stories/${contribution.story_id}`);; 
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Delete a story
  router.put("/:id/delete", (req, res) => {
    const { id } = req.params;
    const queryString = `
      UPDATE stories
      SET is_complete = true
      WHERE ID = $1
      RETURNING *;
    `;
    const queryParams = [id];
    db.query(queryString, queryParams)
      .then(data => {

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Change story title
  router.put("/:id/changetitle", (req, res) => {
    // check if user has permission to edit story title
    const { user_id } = req.session;
    const { id } = req.params;
    const { title } = req.body;
    const queryString = `
      UPDATE stories
      SET title = $1
      WHERE id = $2
      RETURNING *;
    `;
    const queryParams = [title, id];
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

  // Mark story complete
  router.put("/:id/markcomplete", (req, res) => {
    // check if user has permission to edit story title
    const creator_id = req.session.user_id;
    const { id } = req.params;
    const queryString = `
      UPDATE stories 
      SET is_complete = true 
      WHERE id = $1
      RETURNING *;
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

  return router;
};