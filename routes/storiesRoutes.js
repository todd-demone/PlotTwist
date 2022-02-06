// routes/stories.js

const express = require('express');
const router = express.Router();

module.exports = (dbStories, dbTwists) => {
  
  // GET STORIES
  router.get("/", (req, res) => {
    const limit = 10;
    
    dbStories.getStories(limit)
      .then(stories => res.json({ stories }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  // GET STORY
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    let story;
    let twists;
    const results = {};
    dbStories.getStory(id)
      .then(result => story = result)
      .then(() => dbTwists.getTwists(id))
      .then(result => twists = result)
      .then(() => res.json({ story, twists }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

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

  // GET AUTHOR'S STORIES
  router.get("/author/:author_id", (req, res) => {
    const { author_id } = req.params;
    dbStories.getAuthorStories(author_id)
      .then(stories => res.json({ stories }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  
  // "DELETE" STORY
  router.put("/:id/delete", (req, res) => {
    const { id } = req.params;
    const author_id = req.session.user_id;
    dbStories.deleteStory(id, author_id)
      .then(() => res.status(200).send())
      .catch(err => res.status(500).json({ error: err.message }));
  });

  // EDIT STORY
  router.put("/:id", (req, res) => {
    const { title, bodytext } = req.body;
    const { id } = req.params;
    const author_id = req.session.user_id;
    dbStories.editStory(title, bodytext, id, author_id)
      .then(() => res.status(200).send())
      .catch(err => res.status(500).json({ error: err.message }));
  });

  return router;
};