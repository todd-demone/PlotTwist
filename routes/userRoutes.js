const express = require('express');
const router  = express.Router();

module.exports = (dbUsers) => {

  //GET A USER OBJECT
  router.get("/", (req, res) => {
    const { user_id } = req.session;
    if (!user_id) {return res.json(null);}
    dbUsers.getUserObject(user_id)
      .then(result => res.send(result[0]))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  //GET A USER OBJECT
  // router.get("/", (req, res) => {
  //   const { user_id } = req.session;
  //   dbUsers.getUserObject(user_id)
  //     .then(result => res.send(result[0]))
  //     .catch(err => res.status(500).json({ error: err.message }));
  // });
  return router;
};
