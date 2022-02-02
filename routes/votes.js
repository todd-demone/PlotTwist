const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();

//GET # VOTES FOR CONTRIBUTION

module.exports = (db) => {
  router.get("/votes", (req, res) => {
    const contribution_id = req.params.contribution_id;
    const queryString = `SELECT count(votes.*) FROM votes JOIN contributions ON votes.contribution_id = contributions.id WHERE contribution_id = $1;`;
    const queryParams = [contribution_id];
    db.query(queryString, queryParams )
      .then(number_votes => {
        const number_votes = result.rows[0];
        res.send({number_votes});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

//VOTE FOR CONTRIBUTION

module.exports = (db) => {
  router.post("/votes", (req, res) => {
    const contribution_id = req.params.contribution_id;
    const user_id = req.session.userID;
    queryString = `INSERT INTO votes (user_id, contribution_id) VALUES ($1, $2) RETURNING *;`;
    queryParams = [contribution_id, user_id];
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

//DELETE VOTE

module.exports = (db) => {
  router.post("/votes/delete", (req, res) => {
    const vote_id = req.params.vote_id;
    queryString = `UPDATE votes SET active = false WHERE vote_id = $1 RETURNING *;`;
    queryParams = [vote_id];
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

//GET USER'S VOTES???

// module.exports = (db) => {
//   router.get("/votes", (req, res) => {
//     const user_id = req.session.user_id
//     if (!user.id) {
//       res.error("not logged in");
//     }
//     db.query(`SELECT count(votes.*) FROM votes JOIN users ON votes.user_id = users.id WHERE user_id = $1;`, [user_id])
//       .then(number_votes => {
//         const number_votes = result.rows[0];
//         res.send({number_votes});
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
