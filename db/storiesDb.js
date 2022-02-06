// db/stories.js

module.exports = (pool) => {

  // GET STORIES
  const getStories = (limit) => {
    const queryString = `
      SELECT stories.*, users.username
      FROM stories
      JOIN users ON stories.author_id = users.id
      ORDER BY stories.id DESC
      LIMIT $1;
    `;
    const queryParams = [limit];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };

  // GET STORY
  const getStory = (id) => {
    const queryString = `
      SELECT stories.*, users.username 
      FROM stories
      JOIN users ON stories.author_id = users.id
      WHERE stories.id = $1;
    `;
    const queryParams = [id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

  // POST STORY
  const postStory = (author_id, title, bodytext) => {
    const queryString = `
      INSERT INTO stories
      (author_id, title, bodytext)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const queryParams = [author_id, title, bodytext];
    return pool
      .query(queryString, queryParams)  
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

  // COMPLETE STORY
  const completeStory = (id) => {
    const queryString = `
      UPDATE stories 
      SET completed = true 
      WHERE id = $1
      RETURNING *;
    `;
    const queryParams = [id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

  // GET AUTHOR'S STORIES
  const getAuthorStories = (author_id) => {
    const queryString = `
      SELECT * 
      FROM stories
      WHERE author_id = $1
      ORDER BY id DESC;
    `;
    const queryParams = [author_id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };

  // DELETE STORY
  const deleteStory = (id) => {
    const queryString = `
      UPDATE stories
      SET bodytext='[Deleted]'
      WHERE id = $1
      RETURNING *;
    `;
    const queryParams = [id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

  // EDIT STORY
  const editStory = (title, bodytext, id) => {
    const queryString = `
      UPDATE stories
      SET title = $1, bodytext = $2
      WHERE id = $3 
      RETURNING *;
    `;
    const queryParams = [title, bodytext, id];
     return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

  return {
    getStories,
    getStory,
    postStory,
    completeStory,
    getAuthorStories,
    deleteStory,
    editStory
  };
};