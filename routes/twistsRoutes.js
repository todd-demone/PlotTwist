const express = require('express');
const router  = express.Router();

module.exports = (dbTwists) => {

  //////////////////////////
  //////GET REQUESTS////////
  //////////////////////////

  // GET ACCEPTED TWISTS FOR A STORY
  router.get("/story/:story_id/accepted", (req, res) => {
    const { story_id } = req.params;

    dbTwists.getStoryAcceptedTwists(story_id)
      .then(twists => res.json({ twists }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // GET UNACCEPTED TWISTS FOR A STORY
  router.get("/story/:story_id/unaccepted", (req, res) => {
    const { story_id } = req.params;

    dbTwists.getStoryUnacceptedTwists(story_id)
      .then(twists => res.json({ twists }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // GET AUTHOR'S TWISTS
  router.get("author/:author_id", (req, res) => {
    const { author_id } = req.params;

    dbTwists.getAuthorTwists(author_id)
      .then(twists => res.json({ twists }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  ///////////////////////////
  ////POST & PUT REQUESTS////
  ///////////////////////////

  // POST A TWIST
  router.post("/", (req, res) => {
    const author_id = req.session.user_id;
    const { story_id, parent_id, bodytext } = req.body
    dbTwists.postTwist(author_id, story_id, parent_id, bodytext)
      .then(twist => res.json({ twist }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // ACCEPT A TWIST
  router.put("/accept/:twist_id", (req, res) => {
    const { twist_id } = req.params;
    // const author_id = req.session.user_id;
    dbTwists.acceptTwist(twist_id)
      .then(twist => res.json({ twist }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // DELETE TWIST
  router.put("/delete/:twist_id", (req, res) => {
    const { id } = req.params;
    const author_id = req.session.user_id;

    dbTwists(id, author_id)
      .then(() => res.status(200).send())
      .catch(err => res.status(500).json({ error: err.message }));
  });

  return router;

};
