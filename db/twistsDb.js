module.exports = (pool) => {

  // GET TWISTS FOR A STORY
  const getTwists = (story_id) => {
    // const queryString = `
    //   SELECT twists.*, users.username, newTwists.number_of_votes
    //   FROM
    //   (
    //     SELECT twists.id as id, count(votes) as number_of_votes
    //     FROM twists
    //     JOIN votes ON twists.id = votes.twist_id
    //     WHERE twists.story_id = $1
    //     GROUP BY twists.id
    //     ORDER BY parent_id NULLS FIRST
    //   ) newTwists
    //   JOIN twists ON twists.id = newTwists.id
    //   JOIN users ON twists.author_id = users.id;
    // `;
    const queryString = `
      WITH RECURSIVE tp
      (id, story_id, author_id, parent_id, bodytext, accepted, date_created, username, number_of_votes, depth) AS
      (
          SELECT twists.id, twists.story_id, twists.author_id, twists.parent_id, twists.bodytext, twists.accepted, twists.date_created, users.username, twistsVotes.number_of_votes, 0
          FROM
          (
            SELECT twists.id as id, count(votes) as number_of_votes
            FROM twists
            LEFT JOIN votes ON twists.id = votes.twist_id
            WHERE twists.story_id = $1
            GROUP BY twists.id
          ) twistsVotes
          JOIN twists ON twists.id = twistsVotes.id
          JOIN users ON twists.author_id = users.id
          WHERE twists.parent_id = 0
        UNION ALL
          SELECT twists.id, twists.story_id, twists.author_id, twists.parent_id, twists.bodytext, twists.accepted, twists.date_created, users.username, twistsVotes.number_of_votes, tp.depth + 1
          FROM
          (
            SELECT twists.id as id, count(votes) as number_of_votes
            FROM twists
            LEFT JOIN votes ON twists.id = votes.twist_id
            WHERE twists.story_id = $1
            GROUP BY twists.id
          ) twistsVotes
          JOIN twists ON twists.id = twistsVotes.id
          JOIN users ON twists.author_id = users.id
          JOIN tp ON twists.parent_id = tp.id
      )
      SELECT * FROM tp ORDER BY depth, id;
    `;
    const queryParams = [story_id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };

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

  ///////////////////////
  //////POST & PUT///////
  ///////////////////////

   // POST A TWIST
    const postTwist = (author_id, story_id, parent_id, bodytext) => {
      const queryString = `
      INSERT INTO twists
      (author_id, story_id, parent_id, bodytext)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const queryParams = [author_id, story_id, parent_id, bodytext];

    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

   // ACCEPT A TWIST
    const acceptTwist = (twist_id) => {
    const queryString = `
    UPDATE twists
    SET accepted = true
    WHERE twists.id = $1
    RETURNING *;
    `;
    const queryParams = [twist_id];

    return pool
      .query(queryString, queryParams)
      .then(data => {
        return data.rows[0]
      })
      .catch(error => console.error(error.message));
  };

   // DELETE TWIST
   const deleteTwist = (id, author_id) => {
   queryString = `
      UPDATE twists
      SET bodytext = '[Deleted]'
      WHERE id = $1
      AND author_id = $2
      RETURNING *;
    `;
    queryParams = [id, author_id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
   };


   return {
     getTwists,
     getStoryAcceptedTwists,
     getStoryUnacceptedTwists,
     getAuthorTwists,
     postTwist,
     acceptTwist,
     deleteTwist
    }
};
