-- getTwists CTE query

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

-- midterm=# \i db/test.sql 
-- psql:db/test.sql:59: ERROR:  relation "twistsandtheirparents" does not exist
-- LINE 49: JOIN    twistsAndTheirParents ON twists.parent_id = twistsAn...
-- DETAIL:  There is a WITH item named "twistsandtheirparents", but it cannot be referenced from this part of the query.
-- HINT:  Use WITH RECURSIVE, or re-order the WITH items to remove forward references.


-- midterm=# \i db/test.sql 
-- psql:db/test.sql:59: ERROR:  UNION types bigint and character varying cannot be matched
-- LINE 35:         users.username,
--                  ^

WITH RECURSIVE tp (id, parent_id, depth) AS (
    SELECT t.id, t.parent_id, 0 
    FROM twists t WHERE t.parent_id IS NULL
  UNION ALL
    SELECT t.id, t.parent_id, tp.depth + 1
    FROM twists t, tp
    WHERE t.parent_id = tp.id AND t.parent_id IS NOT NULL
)
SELECT * FROM tp;
