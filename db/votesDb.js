module.exports = (pool) => {
  //GET VOTES FOR A TWIST
  const getVotes = (twist_id) => {
    const queryString = `
      SELECT count(votes.*)
      FROM votes
      JOIN twists ON votes.contribution_id = twists.id
      WHERE twists_id = $1;
    `;
    const queryParams = [twist_id];
    return pool
      .query(queryString, queryParams )
      .then(data => {
        console.log
        return data.rows[0]})
      .catch(error => console.error(error.message));
  };

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
    deleteVote,
    getVotes
  }
};
