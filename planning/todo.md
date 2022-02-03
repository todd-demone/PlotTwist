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
* ND - amend response for POST routes - `res.status(201).send()`
* ND - amend response for PUT routes - `res.status(200).send()`

#### Stories routes
* (Done) move most routes to routes/contributions.js

#### Contributions routes
* ND - incorporate "GET total # votes for a contribution" language into all "GET contributions" routes
* ND - change delete vote to an actual router.delete(...)
* ND - new route - PUT /api/contributions/:id/markaccepted
  * add constraints - user must be OP 
  * contrib must be at correct depth - deal with on frontend - accept button only visible if level hasn't been accepted
* remove `where active = true` from `GET /api/contributions/user/:user_id`
* TD - amend route - get unaccepted contribs for a single story
  * need to add SQL query to get contributions in 'thread' order
  * deal with on frontend?
* add conditionals (search filters) for  (nice to have)?
* add route - edit contribution (PUT) (nice to have)
* add route - GET total contributions for a story (nice to have)
* (Done) new route - get top-level contributions 
* (Done) new route - get top-level contrib plus accepted contribs for a single story

## Schema

## Seeds
* ND and TD - find opening lines

## Test db and routes

## Server.js
* TD (Done) - remove line referring to `ejs`
* (Done) remove index route
* (Done) install cookie-session, add require cookie-session and use cookie-session statements
* (Done) use express.json()
