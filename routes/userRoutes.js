const express = require('express');
const router  = express.Router();

module.exports = (dbUsers) => {

  //GET A USER OBJECT
  router.get("/", (req, res) => {
    const { user_id } = req.session;
    console.log(user_id);
    dbUsers.getUserObject(user_id)
      .then(result => res.send(result[0]))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  return router;
};
