const express = require('express');
const router  = express.Router();

//DISPLAY NEWEST STORIES/CONTRIBUTIONS

module.exports = (db) => {
  router.get("/contributions", (req, res) => {
    db.query(`SELECT * FROM contributions WHERE active = true ORDER BY parent_id, date_created;`)
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
  return router;
};

//GET USER'S STORIES/CONTRIBUTIONS

module.exports = (db) => {
  router.get("/contributions/:user_id", (req, res) => {
    const user_id = users[req.session.userID];

    const queryString = `SELECT * FROM contributions WHERE active = true AND user_id = $1 ORDER BY parent_id, date_created;`
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
  return router;
};

//POST A CONTRIBUTION

module.exports = (db) => {
  router.post("/contributions", (req, res) => {
    const user_id = users[req.session.userID];
    const { story_id, parent_id, working_level, text } = req.params
    const queryString = `INSERT INTO contributions (user_id, story_id, parent_id, working_level, text) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const queryParams = [user_id, story_id, parent_id, working_level, text];

    db.query(queryString, queryParams)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

//DELETE CONTRIBUTION

module.exports = (db) => {
  router.post("/contributions/delete", (req, res) => {
    const contribution_id = req.params.contribution_id;
    queryString = `UPDATE contributions SET active = false WHERE contribution_id = $1 RETURNING *;`;
    queryParams = [contribution_id];
    db.query(queryString, queryParams)
      .then(data => {
        res.send(data); ///???
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
