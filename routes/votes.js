const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //VOTE FOR TWIST
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { twist_id } = req.body;
    queryString = `
      INSERT INTO votes (user_id, twist_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    queryParams = [user_id, twist_id];
    db.query(queryString, queryParams)
      .then(data => {
        res.status(201).send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE VOTE
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    queryString = `
      DELETE votes.*
      WHERE id = $1
      RETURNING *;
    `;
    queryParams = [id];
    db.query(queryString, queryParams)
      .then(() => {
        res.status(204).send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;

};

// //GET # VOTES FOR TWIST
  // router.get("/", (req, res) => {
  //   const { twist_id } = req.params;
  //   const queryString = `
  //     SELECT count(votes.*)
  //     FROM votes
  //     JOIN contributions ON votes.contribution_id = contributions.id
  //     WHERE contribution_id = $1;
  //   `;
  //   const queryParams = [contribution_id];
  //   db.query(queryString, queryParams )
  //     .then(number_votes => {
  //       const number_votes = result.rows[0];
  //       res.send({number_votes});
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

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
// };
