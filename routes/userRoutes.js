const express = require('express');
const router  = express.Router();

module.exports = (dbUsers) => {

  //GET A USER OBJECT
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    dbUsers.getUserObject(id)
      .then(result => res.json(result[0]))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  return router;
};
