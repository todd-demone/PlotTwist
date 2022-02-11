const express = require('express');
const router = express.Router();

module.exports = () => {

  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });

  router.post('/logout', (req,res) => {
    console.log("in the logout route")
    req.session = null;
    res.send({});
  });

  return router;
};
