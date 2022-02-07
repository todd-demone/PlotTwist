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
  const deleteStory = (id, author_id) => {
    const queryString = `
      UPDATE stories
      SET bodytext='[Deleted]'
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

  // EDIT STORY
  const editStory = (title, bodytext, id, author_id) => {
    let queryString = `UPDATE stories `;
    let queryParams = [];

    if (title) {
      queryParams.push(title);
      queryString += `SET title = $${queryParams.length} `;
    }
    if (bodytext) {
      if (queryParams.length === 1) {
        queryString += `, `;
      } else {
        queryString += `SET `
      }
      queryParams.push(bodytext);
      queryString += `bodytext = $${queryParams.length} `;
    }
    queryParams.push(id, author_id);
    queryString += `
      WHERE id = $${queryParams.length - 1}
      AND author_id = $${queryParams.length}
      RETURNING *;
    `;
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