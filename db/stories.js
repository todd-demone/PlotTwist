// db/stories.js

module.exports = (pool) => {

  // GET STORIES - DB QUERY
  const getStories = (limit) => {
    const queryString = `
      SELECT *
      FROM stories
      ORDER BY id DESC
      LIMIT $1;
    `;
    const queryParams = [limit];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };

  // GET STORY - DB QUERY
  const getStory = (id) => {
    const queryString = `
      SELECT * 
      FROM stories 
      WHERE id = $1;
    `;
    const queryParams = [id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

  // POST STORY - DB QUERY
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

  // COMPLETE STORY - DB QUERY
  const completeStory = (id, author_id) => {
    const queryString = `
      UPDATE stories 
      SET completed = true 
      WHERE id = $1
      AND author_id = $2
      RETURNING *;
    `;
    const queryParams = [id, author_id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

  return {
    getStories,
    getStory,
    postStory,
    completeStory
  };
};