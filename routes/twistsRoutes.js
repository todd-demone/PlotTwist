const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //////////////////////////
  //////GET REQUESTS////////
  //////////////////////////

  // GET ACCEPTED TWISTS FOR A STORY
  router.get("/story/:story_id/accepted", (req, res) => {
    const { story_id } = req.params;
    const queryString = `
      SELECT twists.*, count(votes) AS number_of_votes
      FROM twists
      JOIN votes ON twists.id = votes.twist_id
      GROUP BY twists.id
      WHERE story_id = $1
      AND accepted = true
      ORDER BY level ASC;
    `;

    const queryParams = [story_id];

    db.query(queryString, queryParams)
      .then(data => {
        const twists = data.rows;
        res.json({ twists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET UNACCEPTED TWISTS FOR A STORY
  router.get("/story/:story_id/unaccepted", (req, res) => {
    const { story_id } = req.params;
    // TODO: amend query string to order twists in 'thread' order
    const queryString = `
      SELECT twists.*, count(votes) AS number_of_votes
      FROM twists
      JOIN votes ON twists.id = votes.twist_id
      WHERE story_id = $1
      AND accepted = false
      ORDER BY parent_id ASC NULLS FIRST;
      `;
      /*
      WITH RECURSIVE story_thread AS (
      SELECT * FROM twists WHERE parent_id IS NULL
      UNION ALL
      SELECT t.* FROM twists AS t JOIN story_thread AS s ON t.parent_id = s.id
      )
      SELECT * FROM story_thread;
      */
    const queryParams = [story_id];
    db.query(queryString, queryParams)
      .then(data => {
        const twists = data.rows;
        res.json({ twists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET AUTHOR'S TWISTS
  router.get("author/:author_id", (req, res) => {
    const { author_id } = req.params;

    const queryString = `
      SELECT twists.*, count(votes) AS number_of_votes
      FROM twists
      JOIN votes ON twists.id = votes.twist_id
      GROUP BY twists.id
      WHERE author_id = $1
      ORDER BY date_created, story_id;
    `;

    const queryParams = [author_id];

    db.query(queryString, queryParams)
      .then(data => {
        const twists = data.rows;
        res.json({ twists });
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

  // POST A TWIST
  router.post("/", (req, res) => {
    const author_id = req.session.user_id;
    const { story_id, parent_id, level, text } = req.body
    const queryString = `
      INSERT INTO twists (author_id, story_id, parent_id, level, text)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const queryParams = [author_id, story_id, parent_id, level, text];

    db.query(queryString, queryParams)
      .then(() => {
        res.status(201).send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // ACCEPT A TWIST
  router.put("/:id/accept", (req, res) => {
    const twist_id = req.params;
    const author_id = req.session.user_id;
    const queryString = `
      UPDATE twists
      SET accepted = true
      FROM twists
      JOIN stories ON stories.id = story_id
      WHERE twists.id = $1
      AND stories.author_id = $2
      RETURNING *;
    `;
    const queryParams = [twist_id, author_id];

    db.query(queryString, queryParams)
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE TWIST
  router.put("/:id/delete", (req, res) => {
    const { id } = req.params;
    const author_id = req.session.user_id;
    queryString = `
      UPDATE twists 
      SET text='[Deleted]'
      WHERE id = $1
      AND author_id = $2
      RETURNING *;
    `;
    queryParams = [id, author_id];
    db.query(queryString, queryParams)
      .then(data => {
        res.status(200).send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;

};
