const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  //////////////////////////
  //////GET REQUESTS////////
  //////////////////////////

  //GET USER'S CONTRIBUTIONS
  router.get("user/:user_id", (req, res) => {
    const { user_id } = req.params;

    const queryString = `
    SELECT contributions.*, count(votes) AS number_of_votes, stories.title AS story_title
    FROM contributions
    JOIN votes ON contributions.id = votes.contribution_id
    JOIN stories ON stories.id = story_id
    GROUP BY contributions.id
    WHERE user_id = $1
    ORDER BY date_created, story_id;
    `;

    const queryParams = [user_id];

    db.query(queryString, queryParams)
      .then(data => {
        const contributions = data.rows;
        res.json({ contributions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // GET "TOP-LEVEL CONTRIBUTIONS" (FOR HOME PAGE)
  router.get("/alltoplevel", (req, res) => {
    const limit = 10;

    const queryString = `
      SELECT contributions.*, stories.title AS story_title
      FROM contributions
      JOIN stories ON stories.id = story_id
      WHERE level = 0
      ORDER BY date_created DESC
      LIMIT $1;
      `;

    const queryParams = [limit];

    db.query(queryString, queryParams)
      .then(data => {
        const topLevelContribs = data.rows;
        res.json({ topLevelContribs });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET TOP-LEVEL PLUS ACCEPTED CONTRIBS FOR A STORY
  router.get("/story/:story_id/accepted", (req, res) => {
    const { story_id } = req.params;
    const queryString = `
      SELECT contributions.*, count(votes) AS number_of_votes, stories.title as story_title
      FROM contributions
      JOIN votes ON contributions.id = votes.contribution_id
      JOIN stories ON stories.id = story_id
      GROUP BY contributions.id
      WHERE story_id = $1 AND accepted = true
      ORDER BY working_level ASC;
      `;

    const queryParams = [story_id];

    db.query(queryString, queryParams)
      .then(data => {
        const acceptedContribs = data.rows;
        res.json({ acceptedContribs });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET ALL (INC. UNACCEPTED) CONTRIBS FOR A STORY
  router.get("/story/:story_id/unaccepted", (req, res) => {
    const { story_id } = req.params;
    // TODO: amend query string to order contributions in 'thread' order
    const queryString = `
      SELECT contributions.*, count(votes) AS number_of_votes,stories.title as story_title
      FROM contributions
      JOIN votes ON contributions.id = votes.contribution_id
      JOIN stories ON stories.id = story_id
      WHERE story_id = $1;
      `;
    const queryParams = [story_id];
    db.query(queryString, queryParams)
      .then(data => {
        const unacceptedContribs = data.rows;
        res.json({ unacceptedContribs });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /////////////////////
  ////POST REQUESTS////
  /////////////////////

  //POST A CONTRIBUTION
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { story_id, parent_id, working_level, text } = req.body
    const queryString = `
      INSERT INTO contributions (user_id, story_id, parent_id, working_level, text)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const queryParams = [user_id, story_id, parent_id, working_level, text];

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

  //ACCEPT A CONTRIBUTION
  router.put("/accept", (req, res) => {
    const { user_id } = req.session;
    const {contribution_id} = req.params;
    const queryString = `
      UPDATE contributions
      SET accepted = true;
      WHERE id = $1
      RETURNING *;
    `;
    const queryParams = [contribution_id];

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

  //DELETE CONTRIBUTION
  router.put("/:id/delete", (req, res) => {
    const { id } = req.params;
    queryString = `
      UPDATE contributions SET text='[Deleted]'
      WHERE id = $1
      RETURNING *;
    `;
    queryParams = [id];
    db.query(queryString, queryParams)
      .then(data => {
        const contribution = data.rows[0];
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
