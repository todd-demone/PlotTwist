module.exports = (pool) => {
  //VOTE FOR A TWIST
  const vote = (user_id, twist_id) => {
    queryString = `
      INSERT INTO votes (user_id, twist_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    queryParams = [user_id, twist_id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  };

  //DELETE VOTE
  const deleteVote = (vote_id) => {
    queryString = `
      DELETE FROM votes
      WHERE id = $1;
    `;
    queryParams = [vote_id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));

  }

  return {
    vote,
    deleteVote
  }
};
