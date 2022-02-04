// routes/stories.js

const express = require('express');
const router = express.Router();

module.exports = (dbStories, dbTwists) => {
  
  //////////////////////////
  //////GET REQUESTS////////
  //////////////////////////

  // GET ALL STORIES
  router.get("/", (req, res) => {
    const limit = 10;
    
    dbStories.getStories(limit)
      .then(stories => res.json({ stories }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // GET STORY
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const results = {};
    dbStories.getStory(id)
      .then(story => results.story = story)
      .then(function() {
        return dbTwists.getAcceptedTwists(id);
      })
      .then(acceptedTwists => results.twists = acceptedTwists)
      .then(function() {
        return dbTwists.getUnacceptedTwists(id);
      })
      .then(unacceptedTwists => results.unacceptedTwists = unacceptedTwists)
      .then(results => res.json({ results }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // GET AUTHOR'S STORIES
  router.get("/author/:author_id", (req, res) => {
    const { author_id } = req.params;
    const queryString = `
      SELECT * 
      FROM stories
      WHERE author_id = $1
      ORDER BY id DESC;
    `;
    const queryParams = [author_id];
    db.query(queryString, queryParams)
      .then(data => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  ///////////////////////////
  ////POST & PUT REQUESTS////
  ///////////////////////////

  // POST STORY
  router.post("/", (req, res) => {
    const author_id = req.session.user_id;
    const { title, bodytext } = req.body;
    dbStories.postStory(author_id, title, bodytext)
      .then(story => res.json({ story })) 
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // COMPLETE STORY
  router.put("/:id/completed", (req, res) => {
    const { id } = req.params;
    // check if author has permission to edit story title
    const author_id = req.session.user_id;
    dbStories.completeStory(id, author_id)
      .then(() => res.status(200).send())
      .catch(err => res.status(500).json({ error: err.message }));      
  });

  // "DELETE" STORY
  router.put("/:id/delete", (req, res) => {
    const { id } = req.params;
    const author_id = req.session.user_id;
    const queryString = `
      UPDATE stories
      SET text='[Deleted]'
      WHERE id = $1
      AND author_id = $2 
      RETURNING *;
    `;
    const queryParams = [id, author_id];
    db.query(queryString, queryParams)
      .then(data => {
        res
          .status(200)
          .send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // EDIT STORY
  router.put("/:id", (req, res) => {
    const { title, text } = req.body;
    const { id } = req.params;
    const author_id = req.session.user_id;
    const queryString = `
      UPDATE stories
      SET title = $1, text = $2
      WHERE id = $3 
      AND author_id = $4
      RETURNING *;
    `;
    const queryParams = [title, text, id, author_id];
    db.query(queryString, queryParams)
      .then(data => {
        res
          .status(200)
          .send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};