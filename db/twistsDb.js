module.exports = (pool) => {

  // GET ACCEPTED TWISTS FOR A STORY
  const getStoryAcceptedTwists = (story_id) => {

    const queryString = `
        SELECT twists.*, count(votes) AS number_of_votes
        FROM twists
        JOIN votes ON twists.id = votes.twist_id
        GROUP BY twists.id
        WHERE story_id = $1
        AND accepted = true
        ORDER BY level ASC;
      `;

    const queryParams = [story_id];

    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };
  // GET UNACCEPTED TWISTS FOR A STORY
  const getStoryUnacceptedTwists = (story_id) => {
    // TODO: amend query string to order twists in 'thread' order
    const queryString = `
      SELECT twists.*, count(votes) AS number_of_votes
      FROM twists
      JOIN votes ON twists.id = votes.twist_id
      WHERE story_id = $1
      AND accepted = false
      ORDER BY parent_id ASC NULLS FIRST;
      `;
      /*
      WITH RECURSIVE story_thread AS (
      SELECT * FROM twists WHERE parent_id IS NULL
      UNION ALL
      SELECT t.* FROM twists AS t JOIN story_thread AS s ON t.parent_id = s.id
      )
      SELECT * FROM story_thread;
      */
    const queryParams = [story_id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));

  };

  // GET AUTHOR'S TWISTS
  const getAuthorTwists = (author_id) => {
    const queryString = `
      SELECT twists.*, count(votes) AS number_of_votes
      FROM twists
      JOIN votes ON twists.id = votes.twist_id
      GROUP BY twists.id
      WHERE author_id = $1
      ORDER BY date_created, story_id;
    `;

    const queryParams = [author_id];

    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };

   // POST A TWIST
    const postTwist = (author_id, story_id, parent_id, level, text) => {
      const queryString = `
      INSERT INTO twists (author_id, story_id, parent_id, level, text)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const queryParams = [author_id, story_id, parent_id, level, text];

    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };

   // ACCEPT A TWIST
    const acceptTwist = (twist_id, author_id) => {
    const queryString = `
    UPDATE twists
    SET accepted = true
    FROM twists
    JOIN stories ON stories.id = story_id
    WHERE twists.id = $1
    AND stories.author_id = $2
    RETURNING *;
    `;
    const queryParams = [twist_id, author_id];

    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };

   // DELETE TWIST
   const deleteTwist = (id, author_id) => {
   queryString = `
      UPDATE twists
      SET text='[Deleted]'
      WHERE id = $1
      AND author_id = $2
      RETURNING *;
    `;
    queryParams = [id, author_id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
   };


   return {
     getStoryAcceptedTwists,
     getStoryUnacceptedTwists,
     getAuthorTwists,
     postTwist,
     acceptTwist,
     deleteTwist
    }
};
