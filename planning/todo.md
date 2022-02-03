# Todo

## Initial app decisions
* (Done) SPA
* (Done) Horizontal workflow

## User Stories
- (Done)

## ERD

#### Stories table 
* (Done) remove total contributions field - can be achieved with query on contributions table
* (Done) change 'is_complete' to 'completed'

#### Contributions table
* (Done) change 'working_level' to 'level'?
* (Done) remove line from story_id to parent_id?

## Routes

#### General notes
* (done) ND - amend response for POST routes - `res.status(201).send()`
* (done) ND - amend response for PUT routes - `res.status(200).send()`
* (Done) TD - Global change of 'creator_id' to 'author_id'
* (Done) TD - Global change of 'working_level' to 'level'
* (Done) TD - global change of 'contribution' to 'twist'
* (Done) TD - mass change user_id to author_id

#### Putting the OP's story in Stories vs putting it in Contributions
* Stories pros:
    * Purity - the story is encapsulated in a single table - the table represents an entity
    * Single POST route (no need to call POST /stories and POST /contributions)
* Stories cons:
    * In order to render a story page, may need to make 3 requests since it's : GET story, GET accepted (order by level), GET unaccepted (order by thread) 
* Contributions pros:
    * easy join of story and contribution records - just a single JOIN to add the stories.title column to the query results.
    * all text submissions almost identical same, some just have a title
* Contribution cons:
    * POST

#### Stories routes
* (Done) TD - move some routes to routes/contributions.js
* (Done) TD - move routes back to routes/stories.js

#### Contributions routes
* PUT ...accepted - contrib must be at correct depth - deal with on frontend - accept button only visible if level hasn't been accepted
* TD - amend route - get unaccepted contribs for a single story
  * need to add SQL query to get contributions in 'thread' order
* add conditionals (search filters) for  (nice to have)?
* add route - edit contribution (PUT) (nice to have)
* add route - GET total contributions for a story (nice to have)
* (Done) new route - get top-level contributions 
* (Done) new route - get top-level contrib plus accepted contribs for a single story
* (done) ND - incorporate "GET total # votes for a contribution" language into all "GET contributions" routes
* (done) ND - change delete vote to an actual router.delete(...)
* (done) ND - new route - PUT /api/contributions/:id/markaccepted
  * (done) TD - add constraints - user must be OP 
* (done ND) remove `where active = true` from `GET /api/contributions/user/:user_id`

## Schema
* Done

## Seeds
* ND and TD - find opening lines

## Test db and routes

## Server.js
* TD (Done) - remove line referring to `ejs`
* (Done) remove index route
* (Done) install cookie-session, add require cookie-session and use cookie-session statements
* (Done) use express.json()
