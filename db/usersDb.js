module.exports = (pool) => {

  //GET USER OBJECT
  const getUserObject = (user_id) => {
    const queryParams = [user_id]
    const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
    `
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows)
      .catch(error => console.error(error.message));
  };

  return { getUserObject };
};
