# Todo

## Initial app decisions
* (Done) SPA
* (Done) Horizontal workflow

## User Stories
- (Done)

## ERD

#### Stories table 
* remove total contributions field - can be achieved with query on contributions table
* change 'is_complete' to 'completed'?

#### Contributions table
* change 'working_level' to 'depth'?
* remove line from story_id to parent_id?

## Routes

#### General notes
* response for POST routes - `res.status(201).send()`
* response for PUT routes - `res.status(200).send()`

#### Stories routes
* (Done) move most routes to routes/contributions.js

#### Contributions routes
* (Done) new route - get top-level contributions 
* (Done) new route - get top-level contrib plus accepted contribs for a single story
* new route - get unaccepted contribs for a single story
  * need to add SQL query to get contributions in 'thread' order
* amend route - PUT ../:id/markaccepted
  * add 2 constraints (user must be OP, contrib must be at correct depth/working level) 
* incorporate GET total # votes for a contribution into the GET contribution routes
* change all contribution queries containing 'where active = true/false'
* add conditionals for GET contribution routes (nice to have)?
* get conditionals for edits (nice to have)?
* add route - GET total contributions for a story (nice to have)

## Schema

## Seeds

## Test db and routes

## Server.js
* remove line referring to `ejs`
* remove index route
* add require cookie-session and use cookie-session statements
* use express.json()?
