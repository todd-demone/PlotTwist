const express = require('express');
const router  = express.Router();

module.exports = (dbVotes) => {

  //VOTE FOR TWIST
  router.post("/:twist_id", (req, res) => {
    const { user_id } = req.session;
    const { twist_id } = req.params;

    dbVotes.vote(user_id, twist_id)
      .then(vote => res.json({ vote }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // DELETE VOTE
  router.delete("/delete/:vote_id", (req, res) => {
    const { user_id } = req.session;
    const { vote_id } = req.params;
    if (!user_id) {
      return res.status(401).send('You cannot delete a vote that you didn\'t create.')
    }

    dbVotes.deleteVote(vote_id)
      .then((num_deleted) => res.json({ num_deleted }))
      .catch(err => res.status(500).json({ error: err.message }));
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
