-- getTwists CTE query

WITH RECURSIVE tp 
(id, story_id, author_id, parent_id, bodytext, accepted, date_created, username, number_of_votes, depth) AS 
(
    SELECT twists.id, twists.story_id, twists.author_id, twists.parent_id, twists.bodytext, twists.accepted, twists.date_created, users.username, twistsVotes.number_of_votes, 0 
    FROM 
    (
      SELECT twists.id as id, count(votes) as number_of_votes
      FROM twists
      LEFT JOIN votes ON twists.id = votes.twist_id
      WHERE twists.story_id = 2
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
      WHERE twists.story_id = 2
      GROUP BY twists.id
    ) twistsVotes
    JOIN twists ON twists.id = twistsVotes.id
    JOIN users ON twists.author_id = users.id
    JOIN tp ON twists.parent_id = tp.id
)
SELECT * FROM tp ORDER BY depth, id;

-- CTE defines a temporary table that is only referenced in the next statement
-- WITH defines what it looks like - name and fields
-- WITH RECURSIVE twistsAndTheirParents
--         (id,
--         story_id,
--         author_id,
--         parent_id,
--         bodytext,
--         accepted,
--         date_created,
--         username,
--         number_of_votes,
--         depth)
-- AS
-- now define what rows go into the CTE/temporary table
(
-- Part A: base condition - it's the twist with no parent
-- SELECT  twists.*,
--         users.username,
--         twistsVotes.number_of_votes,
--         0
-- FROM
--         (
--         SELECT twists.id as id, count(votes) as number_of_votes
--         FROM twists
--         JOIN votes ON twists.id = votes.twist_id
--         WHERE twists.story_id = 2
--         GROUP BY twists.id
--         -- ORDER BY parent_id NULLS FIRST
--         ) twistsVotes
-- JOIN    twists ON twists.id = twistsVotes.id
-- JOIN    users ON twists.author_id = users.id
-- WHERE   twists.parent_id IS NULL

-- UNION ALL

-- -- Part B: the recursive condition
-- SELECT  twists.*,
--         users.username,
--         twistsVotes.number_of_votes,
--         twistsAndTheirParents.depth +1
-- FROM
--         ( 
--         SELECT twists.id as id, count(votes) as number_of_votes
--         FROM twists
--         JOIN votes ON twists.id = votes.twist_id
--         WHERE twists.story_id = 2
--         GROUP BY twists.id
--         -- ORDER BY parent_id NULLS FIRST
--         ) twistsVotes
-- JOIN    twists ON twists.id = twistsVotes.id
-- JOIN    users ON twists.author_id = users.id
-- JOIN    twistsAndTheirParents ON twists.parent_id = twistsAndTheirParents.id
-- )
-- SELECT * 
-- FROM twistsAndTheirParents
-- ORDER BY depth;


-- WITH RECURSIVE tp 
-- (id, story_id, author_id, parent_id, bodytext, username, depth) AS 
-- (
--     SELECT twists.id, twists.story_id, twists.author_id, twists.parent_id, twists.bodytext, users.username, 0 
--     FROM twists
--     JOIN users ON twists.author_id = users.id
--     WHERE twists.parent_id = 0
--   UNION ALL
--     SELECT twists.id, twists.story_id, twists.author_id, twists.parent_id, twists.bodytext, users.username, tp.depth + 1
--     FROM twists
--     JOIN users ON twists.author_id = users.id
--     JOIN tp ON twists.parent_id = tp.id
--     -- WHERE t.parent_id = tp.id
-- )
-- SELECT * FROM tp ORDER BY depth;

